import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { protectAdminApi } from  "@/app/_lib/api/protectAdminApi";

export async function GET(req: NextRequest) {
    // Vérification de l'authentification
    const protection = await protectAdminApi(req);
    if (protection) return protection;

    // Récupération des abonnés à la newsletter si authentifié
    const abonnes = await prisma.abonne.findMany({
        orderBy: { dateInscription: "desc" },
    });

    return NextResponse.json(abonnes);
}
