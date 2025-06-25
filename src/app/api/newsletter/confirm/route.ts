import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import {generateToken} from "@/app/_lib/utils/generateToken";

export async function GET(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.json({ message: "Token manquant." }, { status: 400 });
    }

    const abonne = await prisma.abonne.findFirst({
        where: { token },
    });

    if (!abonne) {
        return NextResponse.json({ message: "Token invalide ou expiré." }, { status: 404 });
    }

    await prisma.abonne.update({
        where: { id: abonne.id },
        data: {
            statutActif: true,
            token: "", // on vide le token pour éviter réutilisation
            tokenDesinscription: generateToken(), // on génère un token pour la désinscription
            tokenSuppression: generateToken(), // on génère un token pour la suppression des données
            dateInscription: new Date(), // on met à jour la date d'inscription
            dateDesinscription: null,
        },
    });

    return NextResponse.json({ message: "Inscription confirmée avec succès !" });
}
