import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.json({ message: "Token manquant." }, { status: 400 });
    }

    const abonne = await prisma.abonne.findFirst({
        where: { tokenDesinscription: token },
    });

    if (!abonne) {
        return NextResponse.json({ message: "Token invalide ou expiré." }, { status: 404 });
    }

    await prisma.abonne.update({
        where: { id: abonne.id },
        data: {
            statutActif: false,
            dateDesinscription: new Date(),
            tokenDesinscription: "", // on vide aussi le token de désinscription après usage
        },
    });

    return NextResponse.json({ message: "Vous êtes bien désinscrit de la newsletter." });
}
