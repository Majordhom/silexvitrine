import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const typesBien = await prisma.mandat.findMany({
            select: { type_bien: true },
            distinct: ["type_bien"],
        });

        const result = typesBien
            .filter(
                (item) =>
                    item.type_bien !== null &&
                    item.type_bien !== "" &&
                    item.type_bien.toLowerCase() !== "null"
            )
            .map((item) => {
                const label = capitalize(item.type_bien!.trim());
                return {
                    key: label,
                    label,
                };
            });

        // Trier alphabétiquement
        result.sort((a, b) => a.label.localeCompare(b.label));

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
