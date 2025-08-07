import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/_lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { criteria, page = 1, pageSize = 50 } = await req.json();

        // Construction dynamique du filtre Prisma
        const where: any = {
            // Toujours filtrer sur les biens publiés et disponibles
            publishedInWebSite: true,
            AND: [
                {
                    OR: [
                        { isNotAvailable: false },
                        { isNotAvailable: null }
                    ]
                }
            ]
        };

        // Recherche par mot-clé (dans le type_bien, ville, ou description)
        if (criteria?.query) {
            where.AND.push({
                OR: [
                    { type_bien: { contains: criteria.query, mode: 'insensitive' } },
                    { ville: { contains: criteria.query, mode: 'insensitive' } },
                    { corps: { contains: criteria.query, mode: 'insensitive' } }
                ]
            });
        }

        // Filtres de prix
        if (criteria?.prixMin) where.prix = { gte: criteria.prixMin };
        if (criteria?.prixMax) where.prix = { ...where.prix, lte: criteria.prixMax };
        
        // Filtre par ville
        if (criteria?.ville) {
            where.ville = { contains: criteria.ville, mode: 'insensitive' };
        }
        
        // Filtre par type de bien
        if (criteria?.type_bien && Array.isArray(criteria.type_bien) && criteria.type_bien.length > 0) {
            where.type_bien = { in: criteria.type_bien };
        }
        
        // Filtre par secteurs (codes postaux)
        if (criteria?.secteurs && Array.isArray(criteria.secteurs) && criteria.secteurs.length > 0) {
            where.cp = { in: criteria.secteurs.map(Number) };
        }

        // Filtre par nombre de pièces
        if (criteria?.nb_pieces) {
            where.nb_pieces = { gte: criteria.nb_pieces };
        }

        // Filtres par surface
        if (criteria?.surface_min) {
            where.surface_habitable = { gte: criteria.surface_min };
        }
        if (criteria?.surface_max) {
            where.surface_habitable = { ...where.surface_habitable, lte: criteria.surface_max };
        }

        // Calcul de la pagination
        const skip = (page - 1) * pageSize;

        // Exécuter les requêtes en parallèle
        const [mandats, total] = await Promise.all([
            prisma.mandat.findMany({
                where,
                include: {
                    photos: {
                        take: 3,
                        orderBy: { position: 'asc' }
                    }
                },
                orderBy: { dateMaj: 'desc' },
                skip,
                take: pageSize,
            }),
            prisma.mandat.count({ where })
        ]);

        return NextResponse.json({ 
            mandats,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        });
    } catch (err) {
        console.error('[Search Error]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
