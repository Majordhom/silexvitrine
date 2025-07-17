import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import {auth} from "@/auth";

export async function protectAdminApi(req: NextRequest) {
    const session = await getServerSession(auth);

    if (!session || !session.user) {
        return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }
    return null; // Pas d'erreur, accès autorisé
}
