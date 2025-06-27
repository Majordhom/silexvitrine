import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { criteria } = await req.json();

        // Construction dynamique du filtre Prisma
        const where: any = {};

        if (criteria?.prixMin) where.prix = { gte: criteria.prixMin };
        if (criteria?.prixMax) where.prix = { ...where.prix, lte: criteria.prixMax };
        if (criteria?.ville) where.ville = { contains: criteria.ville, mode: 'insensitive' };
        if (criteria?.type_bien) where.type_bien = criteria.type_bien;
        if (criteria?.secteurs && Array.isArray(criteria.secteurs)) {
            where.cp = { in: criteria.secteurs.map(Number) };
        }
        // Ajouter d'autres critères selon le besoin

        const mandats = await prisma.mandat.findMany({
            where,
            orderBy: { dateMaj: 'desc' },
            take: 50, // Limite pour la pagination
        });

        return NextResponse.json({ mandats });
    } catch (err) {
        console.error('[Search Error]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
