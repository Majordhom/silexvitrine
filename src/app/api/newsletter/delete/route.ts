import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function DELETE(req: NextRequest) {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
        return NextResponse.json({ message: "Token manquant." }, { status: 400 });
    }

    const abonne = await prisma.abonne.findFirst({
        where: { tokenSuppression: token },
    });

    if (!abonne) {
        return NextResponse.json({ message: "Token invalide ou expiré." }, { status: 404 });
    }

    await prisma.abonne.delete({
        where: { id: abonne.id },
    });

    return NextResponse.json({ message: "Vos données ont bien été supprimées." });
}
