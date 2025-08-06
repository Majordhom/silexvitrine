const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
    const email = "admin@silexvitrine.com"; // Change this to your preferred email
    const plainPassword = "Admin123!"; // Change this to your preferred password
    const nom = "Admin"; // Change this to your preferred last name
    const prenom = "SilexVitrine"; // Change this to your preferred first name

    try {
        // Check if user already exists
        const existingUser = await prisma.utilisateur.findUnique({
            where: { email }
        });

        if (existingUser) {
            console.log("❌ User already exists with email:", email);
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Create or update the user with all fields
        const user = await prisma.utilisateur.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                role: "admin",
                nom,
                prenom,
                updatedAt: new Date()
            },
            create: {
                email,
                password: hashedPassword,
                nom,
                prenom,
                role: "admin",
                telephone: null, // Optional field
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });

        console.log("✅ Admin user created successfully!");
        console.log("📧 Email:", user.email);
        console.log("👤 Name:", user.prenom, user.nom);
        console.log("🆔 User ID:", user.id);
        console.log("📅 Created at:", user.createdAt);
        console.log("");
        console.log("🔐 Login credentials:");
        console.log("   Email:", email);
        console.log("   Password:", plainPassword);
        console.log("");
        console.log("⚠️  Remember to change the password after first login!");

    } catch (error) {
        console.error("❌ Error creating admin user:", error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 