import { PrismaClient } from "../src/generated/prisma";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;


// Pourquoi ?
// Évite de créer plusieurs instances (important dans Next.js à cause des hot reload)
// Assure que Prisma n'est appelé que côté serveur
// Compatible Turbopack