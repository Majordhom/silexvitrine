import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for") || "inconnue";
    return NextResponse.json({ ip });
}

// cette route est utilisée pour obtenir l'adresse IP du client