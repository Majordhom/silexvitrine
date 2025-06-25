import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function PATCH(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.abonne.update({
        where: { id },
        data: {
            statutActif: false,
            dateDesinscription: new Date(),
            tokenDesinscription: null,
        },
    });

    return NextResponse.json({ success: true });
}
