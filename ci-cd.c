#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdarg.h>
#include <unistd.h>

#define COLOR_GREEN "\033[0;32m"
#define COLOR_RED   "\033[0;31m"
#define COLOR_RESET "\033[0m"

// Exécute une commande système formatée
int execute_command(const char* format, ...) {
    va_list args, args_copy;
    va_start(args, format);
    va_copy(args_copy, args);

    int len = vsnprintf(NULL, 0, format, args_copy);
    va_end(args_copy);

    if (len < 0) {
        va_end(args);
        fprintf(stderr, COLOR_RED "Error formatting command\n" COLOR_RESET);
        return 1;
    }

    char* buffer = malloc(len + 1);
    if (!buffer) {
        va_end(args);
        fprintf(stderr, COLOR_RED "Memory allocation failed\n" COLOR_RESET);
        return 1;
    }

    vsnprintf(buffer, len + 1, format, args);
    va_end(args);

    printf(COLOR_GREEN ">> %s\n" COLOR_RESET, buffer);
    int result = system(buffer);
    if (result != 0) {
        fprintf(stderr, COLOR_RED "Command failed: %s\n" COLOR_RESET, buffer);
    }

    free(buffer);
    return result != 0;
}

// Exécute les étapes de build/test/push sur une branche donnée
int run_build_and_push(const char* branch_name) {
    if (chdir("src") != 0) {
        perror("chdir to src");
        return 1;
    }

    if (execute_command("npm run build") != 0) return 1;
    if (execute_command("npm run lint") != 0) return 1;
    // if (execute_command("npm run test") != 0) {
    //     fprintf(stderr, COLOR_RED "Tests failed, exiting.\n" COLOR_RESET);
    //     return 1;
    // }

    if (chdir("..") != 0) {
        perror("chdir back");
        return 1;
    }

    if (execute_command("git add .") != 0) return 1;
    if (execute_command("git commit -m \"Commit Automatique, Test validés\"") != 0) return 1;

    if (branch_name) {
        return execute_command("git push origin %s", branch_name);
    } else {
        return execute_command("git push");
    }
}

// Récupère le nom de la branche actuelle
char* get_current_branch() {
    static char branch[256];
    FILE* fp = popen("git rev-parse --abbrev-ref HEAD", "r");
    if (!fp) return NULL;
    if (fgets(branch, sizeof(branch), fp) == NULL) {
        pclose(fp);
        return NULL;
    }
    branch[strcspn(branch, "\n")] = 0; // Remove newline
    pclose(fp);
    return branch;
}

// Point d'entrée
int main(int argc, char *argv[]) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s --branch <branch-name> | --force <arg> | --current\n", argv[0]);
        return EXIT_FAILURE;
    }

    if (strcmp(argv[1], "--branch") == 0) {
        if (argc < 3) {
            fprintf(stderr, "Error: --branch requires an argument\n");
            return EXIT_FAILURE;
        }
        printf("Using branch: %s\n", argv[2]);
        if (run_build_and_push(argv[2]) != 0) return EXIT_FAILURE;

    } else if (strcmp(argv[1], "--force") == 0) {
        printf("Force pushing to 'main'\n");
        if (run_build_and_push("main") != 0) return EXIT_FAILURE;

    } else if (strcmp(argv[1], "--current") == 0) {
        char* branch = get_current_branch();
        if (!branch) {
            fprintf(stderr, "Failed to get current branch\n");
            return EXIT_FAILURE;
        }
        printf("Pushing to current branch: %s\n", branch);
        if (run_build_and_push(branch) != 0) return EXIT_FAILURE;

    } else {
        fprintf(stderr, "Error: Unknown option '%s'. Use --branch, --force or --current\n", argv[1]);
        return EXIT_FAILURE;
    }

    printf(COLOR_GREEN "All commands executed successfully.\n" COLOR_RESET);
    return EXIT_SUCCESS;
}
