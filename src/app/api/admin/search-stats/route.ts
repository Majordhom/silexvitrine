import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import { subDays, subWeeks, subMonths, subYears, startOfDay, endOfDay, format } from "date-fns";
import { protectAdminApi } from "@/app/_lib/api/authMiddleware";

const PERIOD_FORMATS: Record<string, string> = {
    day: "yyyy-MM-dd",
    week: "yyyy-'W'II",
    month: "yyyy-MM",
    year: "yyyy",
};

export async function GET(req: NextRequest) {
    // Vérification de l'authentification
    const protection = await protectAdminApi(req);
    if (protection) return protection;

    // Traitement de la requête si authentifié
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "month";
    const startParam = searchParams.get("start");
    const endParam = searchParams.get("end");

    let start: Date, end: Date;
    const now = new Date();

    switch (period) {
        case "day":
            start = subDays(now, 30);
            end = now;
            break;
        case "week":
            start = subWeeks(now, 12);
            end = now;
            break;
        case "month":
            start = subMonths(now, 12);
            end = now;
            break;
        case "year":
            start = subYears(now, 5);
            end = now;
            break;
        case "custom":
            start = startParam ? new Date(startParam) : subMonths(now, 1);
            end = endParam ? new Date(endParam) : now;
            break;
        default:
            start = subMonths(now, 12);
            end = now;
    }

    const searches = await prisma.dataSearch.findMany({
        where: {
            createdAt: {
                gte: startOfDay(start),
                lte: endOfDay(end),
            },
        },
        select: {
            createdAt: true,
            nb_pieces: true,
            type_bien: true,
            prixMin: true,
            prixMax: true,
            secteur: true,
        },
    });

    // Générer toutes les périodes (labels X)
    let formatKey: string;
    if (period === "custom") {
        const diff = end.getTime() - start.getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneMonth = oneDay * 30;
        const oneYear = oneDay * 365;
        if (diff <= oneMonth) {
            formatKey = PERIOD_FORMATS["day"];
        } else if (diff <= oneYear) {
            formatKey = PERIOD_FORMATS["month"];
        } else {
            formatKey = PERIOD_FORMATS["year"];
        }
    } else {
        formatKey = PERIOD_FORMATS[period] || PERIOD_FORMATS["month"];
    }
    const allPeriodsSet = new Set<string>();
    searches.forEach((s) => {
        allPeriodsSet.add(format(s.createdAt, formatKey));
    });
    const dates = Array.from(allPeriodsSet).sort();

    // Helper pour initialiser les objets
    function initSeries() {
        return Object.fromEntries(dates.map((d) => [d, 0]));
    }

    // Agrégation par critère et par période
    const pieces: Record<string, number[]> = {};
    const types: Record<string, number[]> = {};
    const prix: Record<string, number[]> = {};
    const secteurs: Record<string, number[]> = {};

    // Collecte des valeurs uniques
    const piecesSet = new Set<number>();
    const typesSet = new Set<string>();
    const prixSet = new Set<string>();
    const secteursSet = new Set<number>();

    searches.forEach((s) => {
        const d = format(s.createdAt, formatKey);
        if (s.nb_pieces !== null && s.nb_pieces !== undefined) piecesSet.add(s.nb_pieces);
        if (s.type_bien) typesSet.add(s.type_bien);
        if (s.prixMin !== null && s.prixMax !== null && s.prixMin !== undefined && s.prixMax !== undefined) {
            prixSet.add(`${s.prixMin}-${s.prixMax}`);
        }
        if (Array.isArray(s.secteur)) {
            s.secteur.forEach((sect) => secteursSet.add(Number(sect)));
        } else if (s.secteur !== null && s.secteur !== undefined) {
            secteursSet.add(s.secteur);
        }
    });

    // Initialisation
    piecesSet.forEach((val) => { pieces[val] = Array(dates.length).fill(0); });
    typesSet.forEach((val) => { types[val] = Array(dates.length).fill(0); });
    prixSet.forEach((val) => { prix[val] = Array(dates.length).fill(0); });
    secteursSet.forEach((val) => { secteurs[val] = Array(dates.length).fill(0); });

    // Remplissage
    searches.forEach((s) => {
        const d = format(s.createdAt, formatKey);
        const idx = dates.indexOf(d);
        if (idx === -1) return;
        if (s.nb_pieces !== null && s.nb_pieces !== undefined) pieces[s.nb_pieces][idx]++;
        if (s.type_bien) types[s.type_bien][idx]++;
        if (s.prixMin !== null && s.prixMax !== null && s.prixMin !== undefined && s.prixMax !== undefined) {
            prix[`${s.prixMin}-${s.prixMax}`][idx]++;
        }
        if (Array.isArray(s.secteur)) {
            s.secteur.forEach((sect) => {
                if (secteurs[sect]) secteurs[sect][idx]++;
            });
        } else if (s.secteur !== null && s.secteur !== undefined) {
            if (secteurs[s.secteur]) secteurs[s.secteur][idx]++;
        }
    });

    return NextResponse.json({
        dates,
        pieces,
        types,
        prix,
        secteurs,
    });
}