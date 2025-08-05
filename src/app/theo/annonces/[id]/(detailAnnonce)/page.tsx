import { prisma } from "@/app/_lib/prisma";
import { notFound } from 'next/navigation';
import TheoAnnonceDetail from "@/app/theo/_components/TheoAnnonceDetail";
import TheoAnnonceDetailFallback from "@/app/theo/_components/TheoAnnonceDetailFallback";
import { Mandat, MandatPhoto } from "@/generated/prisma";
import Script from "next/script";

type PageProps = {
    params?: Promise<any>;
};

type MandatWithPhotos = Mandat & {
    photos: MandatPhoto[]
    distance?: number
    scoreProximite?: number
};

// Generate static params for all published annonces
export async function generateStaticParams() {
    try {
        const annonces = await prisma.mandat.findMany({
            where: {
                publishedInWebSite: true,
                isNotAvailable: false
            },
            select: { id: true }
        });
        return annonces.map(mandat => ({ params: { id: mandat.id.toString() } }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

// Generate structured data for SEO
function generateStructuredData(annonce: any) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": annonce.titre,
        "description": annonce.description,
        "category": annonce.caracteristiques?.type,
        "brand": {
            "@type": "Brand",
            "name": "SilexVitrine"
        },
        "offers": {
            "@type": "Offer",
            "price": annonce.prix,
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "SilexVitrine"
            }
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": annonce.ville,
            "postalCode": annonce.cp,
            "addressCountry": "FR"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Surface",
                "value": `${annonce.surface} m²`
            },
            {
                "@type": "PropertyValue",
                "name": "Pièces",
                "value": annonce.nb_pieces
            },
            {
                "@type": "PropertyValue",
                "name": "Type",
                "value": annonce.caracteristiques?.type
            }
        ]
    };

    return structuredData;
}

export default async function AnnoncePage({ params }: PageProps) {
    try {
        const { id } = await Promise.resolve(params);
        const mandatId = Number(id);
        
        if (isNaN(mandatId)) {
            console.error('Invalid mandat ID:', id);
            return <TheoAnnonceDetailFallback />;
        }

        const mandat = await prisma.mandat.findUnique({
            where: { 
                id: mandatId,
                publishedInWebSite: true,
                isNotAvailable: false
            },
            include: { photos: true }
        });

        if (!mandat) {
            console.error('Mandat not found for ID:', mandatId);
            return <TheoAnnonceDetailFallback />;
        }

        // Find similar properties with better filtering
        let similaires: MandatWithPhotos[] = [];

        try {
            similaires = await prisma.mandat.findMany({
                where: {
                    id: { not: mandatId },
                    publishedInWebSite: true,
                    isNotAvailable: false,
                    prix: { 
                        gte: mandat.prix * 0.7, 
                        lte: mandat.prix * 1.3 
                    },
                    nb_pieces: mandat.nb_pieces,
                    type_bien: mandat.type_bien,
                    ville: mandat.ville
                },
                take: 6,
                include: { photos: true },
                orderBy: {
                    dateMaj: 'desc'
                }
            });

            // If not enough similar properties, get more from same city
            if (similaires.length < 3) {
                const additionalSimilaires = await prisma.mandat.findMany({
                    where: {
                        id: { not: mandatId },
                        publishedInWebSite: true,
                        isNotAvailable: false,
                        ville: mandat.ville,
                        prix: { 
                            gte: mandat.prix * 0.5, 
                            lte: mandat.prix * 1.5 
                        }
                    },
                    take: 6 - similaires.length,
                    include: { photos: true },
                    orderBy: {
                        dateMaj: 'desc'
                    }
                });
                
                similaires = [...similaires, ...additionalSimilaires];
            }
        } catch (error) {
            console.error('Error fetching similar properties:', error);
        }

        // Transform data for the component
        const annonceData = {
            id: mandat.id,
            titre: mandat.titre || `${mandat.type_bien} ${mandat.nb_pieces} pièces`,
            prix: mandat.prix || 0,
            surface: mandat.surface || 0,
            nb_pieces: mandat.nb_pieces || 0,
            ville: mandat.ville || 'Non spécifié',
            cp: mandat.cp || '',
            description: mandat.description || undefined,
            photos: mandat.photos.map(photo => ({
                id: photo.id,
                url: photo.url || photo.src,
                alt: photo.alt || `${mandat.titre} - Photo ${photo.id}`
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
                url: photo.url || photo.src,
                alt: photo.alt || `${similaire.titre} - Photo ${photo.id}`
            }))
        }));

        const structuredData = generateStructuredData(annonceData);

        return (
            <>
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData),
                    }}
                />
                <TheoAnnonceDetail 
                    annonce={annonceData}
                    similaires={similairesData}
                />
            </>
        );
    } catch (error) {
        console.error('Error in AnnoncePage:', error);
        return <TheoAnnonceDetailFallback />;
    }
}