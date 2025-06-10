import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
 // importer une instance du client Prisma pour interagir avec la base de données

export async function POST(req: Request) {
    const body = await req.json();

    if (!body.email) {
        return NextResponse.json({ error: "Email manquant" }, { status: 400 });
    }

    try {
        const message = await prisma.contactMessage.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                subject: body.subject,
                message: body.message,
            },
        });
        console.log("Message enregistré :", message);
        return NextResponse.json(message);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
