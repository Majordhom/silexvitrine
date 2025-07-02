import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const secteurs = await prisma.mandat.findMany({
            select: {
                ville: true,
                cp: true,
            },
            orderBy: [{ ville: "asc" }, { cp: "asc" }],
        });

        const result: { key: string; label: string }[] = [];
        const vueSecteurs = new Set<string>();

        // Stocker le nombre de CP par ville
        const villesCount: Record<string, Set<number>> = {};

        secteurs.forEach((item) => {
            if (
                !item.cp ||
                !item.ville ||
                item.ville.toLowerCase() === "null" ||
                item.ville.trim() === ""
            ) {
                return;
            }

            const ville = capitalize(item.ville.trim());
            const cp = item.cp;

            if (!villesCount[ville]) {
                villesCount[ville] = new Set();
            }
            villesCount[ville].add(cp);
        });

        // Repasser pour créer la liste définitive
        Object.entries(villesCount).forEach(([ville, cps]) => {
            if (cps.size > 1) {
                // Si plusieurs CP → on affiche chaque CP avec la ville
                cps.forEach((cp) => {
                    const key = cp.toString();
                    const label = `${cp} ${ville}`;
                    if (!vueSecteurs.has(key)) {
                        vueSecteurs.add(key);
                        result.push({ key, label });
                    }
                });
            } else {
                // Sinon → un seul CP sans mentionner le CP dans le label
                const cp = [...cps][0];
                const key = cp.toString();
                if (!vueSecteurs.has(key)) {
                    vueSecteurs.add(key);
                    result.push({ key, label: ville });
                }
            }
        });

        // Trier alphabetiquement
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
