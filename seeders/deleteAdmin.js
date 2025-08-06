const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.utilisateur.deleteMany({
            where: {
                email: "admin@silexvitrine.com"
            }
        });
        console.log("✅ Existing admin user deleted");
    } catch (error) {
        console.error("❌ Error deleting admin user:", error);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
