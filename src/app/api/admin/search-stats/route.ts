
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
// import { subDays, subWeeks, subMonths, subYears, format } from "date-fns";
import { protectAdminApi } from  "@/app/_lib/api/protectAdminApi";

const PERIOD_FORMATS: Record<string, string> = {
    day: "yyyy-MM-dd",
    week: "yyyy-'W'II",
    month: "yyyy-MM",
    year: "yyyy",
};

// Fonction utilitaire pour obtenir le début de la journée
function getStartOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

// Fonction utilitaire pour obtenir la fin de la journée
function getEndOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}

export async function GET(req: NextRequest) {
    // Vérification de l'authentification
    const protection = await protectAdminApi(req);
    if (protection) return protection;

    // Version simplifiée temporaire
    return NextResponse.json({
        message: "API temporairement simplifiée - espace disque insuffisant",
        dates: [],
        pieces: {},
        types: {},
        prix: {},
        secteurs: {},
    });
}