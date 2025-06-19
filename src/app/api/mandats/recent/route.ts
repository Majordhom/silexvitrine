import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET() {
    try {
        const mandats = await prisma.mandat.findMany({
            where: {
                publishedInWebSite: true, // ou publishedInApp
            },
            orderBy: {
                dateMaj : "desc",
            },
            take: 6,
            include: {
                photos: true,
            },
        });

        return NextResponse.json(mandats);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
