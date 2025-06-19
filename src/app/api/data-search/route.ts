import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const filters = await req.json();
        // Vérification si les champs sont vides
        const { nb_pieces, type_bien, prixMin, prixMax, secteur } = filters;
        const isAllEmpty = [nb_pieces, type_bien, prixMin, prixMax, secteur]
            .every(val => val === undefined || val === null || val === '');
        // Insertion dans DataSearch
        await prisma.dataSearch.create({
            data: {
                nb_pieces: nb_pieces ? Number(nb_pieces) : null,
                type_bien: type_bien || null,
                prixMin: prixMin ? Number(prixMin) : null,
                prixMax: prixMax ? Number(prixMax) : null,
                secteur: secteur ? Number(secteur) : null,
            }
        });

        return NextResponse.json({ message: "Recherche enregistrée." });
    } catch (err) {
        console.error('[DataSearch Error]', err);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}