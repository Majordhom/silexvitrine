const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const email = "admin@silexvitrine.com";
    const plainPassword = "Admin123!";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await prisma.utilisateur.upsert({
        where: { email },
        update: {
            role: "admin",
            password: hashedPassword
        },
        create: {
            email,
            password: hashedPassword,
            nom: "Admin",
            prenom: "SilexVitrine",
            role: "admin"
        }
    });

    console.log("User updated:", user);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
