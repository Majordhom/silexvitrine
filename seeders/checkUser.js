const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkUser() {
    const user = await prisma.utilisateur.findUnique({
        where: { email: "admin@silexvitrine.com" }
    });
    console.log("Found user:", user);
    await prisma.$disconnect();
}

checkUser().catch(console.error);
