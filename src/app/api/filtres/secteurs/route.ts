import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const secteurs = await prisma.mandat.findMany({
            select: {
                ville: true,
                cp: true,
            },
            orderBy: [{ cp: "asc" }, { ville: "asc" }],
        });

        const result: { key: string; label: string }[] = [];
        const autresVilles = new Set<string>();
        const marseilleSet = new Set<string>();

        secteurs.forEach((item) => {
            if (
                !item.cp ||
                !item.ville ||
                item.ville.toLowerCase() === "null" ||
                item.ville.trim() === ""
            ) {
                return; // skip si invalide
            }

            const ville = capitalize(item.ville.trim());

            if (ville.toLowerCase() === "marseille") {
                const key = `${item.cp} ${ville}`;
                if (!marseilleSet.has(key)) {
                    marseilleSet.add(key);
                    result.push({
                        key: item.cp.toString(),
                        label: key,
                    });
                }
            } else {
                if (!autresVilles.has(ville)) {
                    autresVilles.add(ville);
                    result.push({
                        key: ville,
                        label: ville,
                    });
                }
            }
        });

        // Trier : Marseille en haut
        result.sort((a, b) => {
            if (a.label.includes("Marseille") && !b.label.includes("Marseille"))
                return -1;
            if (!a.label.includes("Marseille") && b.label.includes("Marseille"))
                return 1;
            return a.label.localeCompare(b.label);
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
