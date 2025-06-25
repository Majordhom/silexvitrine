import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET() {
    const abonnes = await prisma.abonne.findMany({
        orderBy: { dateInscription: "desc" },
    });

    return NextResponse.json(abonnes);
}
