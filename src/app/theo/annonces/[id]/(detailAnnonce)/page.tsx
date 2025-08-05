import { prisma } from "@/app/_lib/prisma";
import { notFound } from 'next/navigation';
import TheoAnnonceDetail from "@/app/theo/_components/TheoAnnonceDetail";
import TheoAnnonceDetailFallback from "@/app/theo/_components/TheoAnnonceDetailFallback";
import { Mandat, MandatPhoto } from "@/generated/prisma";

type PageProps = {
    params?: Promise<any>;
};

type MandatWithPhotos = Mandat & {
    photos: MandatPhoto[]
    distance?: number
    scoreProximite?: number
};

// Generate static params for all annonces
export async function generateStaticParams() {
    try {
        const annonces = await prisma.mandat.findMany({
            select: { id: true }
        });
        return annonces.map(mandat => ({ params: { id: mandat.id.toString() } }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

export default async function AnnoncePage({ params }: PageProps) {
    try {
        const { id } = await Promise.resolve(params);
        const mandatId = Number(id);
        
        if (isNaN(mandatId)) {
            console.error('Invalid mandat ID:', id);
            // For testing purposes, show fallback instead of 404
            return <TheoAnnonceDetailFallback />;
        }

        const mandat = await prisma.mandat.findUnique({
            where: { id: mandatId },
            include: { photos: true }
        });

        if (!mandat) {
            console.error('Mandat not found for ID:', mandatId);
            // For testing purposes, show fallback instead of 404
            return <TheoAnnonceDetailFallback />;
        }

        // Find similar properties
        let similaires: MandatWithPhotos[] = [];

        try {
            similaires = await prisma.mandat.findMany({
                where: {
                    id: { not: mandatId },
                    prix: { gte: mandat.prix * 0.85, lte: mandat.prix * 1.15 },
                    nb_pieces: mandat.nb_pieces,
                },
                take: 3,
                include: { photos: true }
            });
        } catch (error) {
            console.error('Error fetching similar properties:', error);
        }

        // Transform data for the component
        const annonceData = {
            id: mandat.id,
            titre: mandat.titre || `Propriété ${mandat.id}`,
            prix: mandat.prix || 0,
            surface: mandat.surface || 0,
            nb_pieces: mandat.nb_pieces || 0,
            ville: mandat.ville || 'Non spécifié',
            cp: mandat.cp || '',
            description: mandat.description || undefined,
            photos: mandat.photos.map(photo => ({
                id: photo.id,
                url: photo.url,
                alt: photo.alt || undefined
            })),
            caracteristiques: {
                type: mandat.type_bien || 'Non spécifié',
                etage: mandat.etage || undefined,
                cuisine: mandat.type_cuisine || undefined,
                chauffage: mandat.type_chauffage || undefined,
                foncier: mandat.foncier || undefined
            }
        };

        const similairesData = similaires.map(similaire => ({
            id: similaire.id,
            titre: similaire.titre || `Propriété ${similaire.id}`,
            prix: similaire.prix || 0,
            surface: similaire.surface || 0,
            ville: similaire.ville || 'Non spécifié',
            photos: similaire.photos.map(photo => ({
                id: photo.id,
                url: photo.url,
                alt: photo.alt || undefined
            }))
        }));

        return (
            <TheoAnnonceDetail 
                annonce={annonceData}
                similaires={similairesData}
            />
        );
    } catch (error) {
        console.error('Error in AnnoncePage:', error);
        // For testing purposes, show fallback instead of 404
        return <TheoAnnonceDetailFallback />;
    }
}