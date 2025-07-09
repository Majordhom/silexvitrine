import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const filters = await req.json();
        const { nb_pieces, type_bien, prixMin, prixMax, secteurs } = filters;

        // Vérifie si tous les champs sont vides ou non sélectionnés
        const isAllEmpty = [
            nb_pieces,
            prixMin,
            prixMax,
            Array.isArray(type_bien) ? type_bien.length === 0 : true,
            Array.isArray(secteurs) ? secteurs.length === 0 : true
        ].every(val => val === undefined || val === null || val === '' || val === true);

        if (isAllEmpty) {
            return NextResponse.json({ message: "Aucune donnée à enregistrer." }, { status: 204 });
        }

        // Construit l'objet data uniquement avec les champs renseignés
        const data: any = {};
        if (nb_pieces) data.nb_pieces = Number(nb_pieces);
        if (prixMin) data.prixMin = Number(prixMin);
        if (prixMax) data.prixMax = Number(prixMax);
        if (Array.isArray(type_bien) && type_bien.length > 0) {
            data.type_bien = type_bien;
        }
        if (Array.isArray(secteurs) && secteurs.length > 0) {
            data.secteur = secteurs;
        }

        await prisma.dataSearch.create({ data });

        return NextResponse.json({ message: "Recherche enregistrée." });
    } catch (err) {
        console.error('[DataSearch Error]', err);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}