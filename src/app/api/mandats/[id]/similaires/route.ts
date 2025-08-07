import { NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<any> }) {
    try {
        const { id } = await params;

        const mandatId = parseInt(id);
        if (isNaN(mandatId)) {
            return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
        }

        // Récupérer le mandat courant pour connaître son secteur et type
        const mandat = await prisma.mandat.findUnique({
            where: { id: mandatId },
            select: {
                id: true,
                type_bien: true,
                cp: true,
            },
        });

        if (!mandat) {
            return NextResponse.json({ error: 'Mandat introuvable' }, { status: 404 });
        }

        // Récupérer 3 biens similaires (même secteur OU même type de bien), exclure celui-ci
        const similaires = await prisma.mandat.findMany({
            where: {
                id: { not: mandatId }, // Exclure le mandat courant
                cp: mandat.cp, // même code postal
                type_bien: mandat.type_bien, // même type de bien
            },
            orderBy: { prix: 'desc' },
            take: 3,
            select: {
                id: true,
                prix: true,
                type_bien: true,
                surface_habitable: true,
                cp: true,
                ville: true,
                photos: {
                    select: { src: true },
                    take: 1,
                },
            },
        });

        return NextResponse.json(similaires);
    } catch (error) {
        console.error('[Similaires Error]', error);
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
