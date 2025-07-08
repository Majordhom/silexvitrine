import { NextResponse,NextRequest } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { protectAdminApi } from "@/app/_lib/api/authMiddleware";

export async function DELETE(request: NextRequest) {
    // Vérification de l'authentification
    const protection = await protectAdminApi(request);
    if (protection) return protection;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    await prisma.abonne.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}
