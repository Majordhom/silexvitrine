const { PrismaClient } = require("../src/generated/prisma/client");
const bcrypt = require("bcrypt") ;

const prisma = new PrismaClient();

async function main() {
    const email = "admin@example.com"; // Remplacez par l'email souhaité
    const plainPassword = "MotDePasse123"; // Remplacez par le mot de passe souhaité

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await prisma.utilisateur.create({
        data: {
            email,
            password: hashedPassword,
            nom: "Admin",
            prenom: "Test",
        },
    });

    console.log("Utilisateur créé :", user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
