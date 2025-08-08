import { prisma } from "@/app/_lib/prisma";
import { notFound } from 'next/navigation';
import TheoAnnonceDetail from "@/app/(web-template)/theo/_components/TheoAnnonceDetail";
import TheoAnnonceDetailFallback from "@/app/(web-template)/theo/_components/TheoAnnonceDetailFallback";
import { Mandat, MandatPhoto } from "@/generated/prisma";
import Script from "next/script";

type MandatWithPhotos = Mandat & {
    photos: MandatPhoto[]
    distance?: number
    scoreProximite?: number
};

type PageProps = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all published annonces
export async function generateStaticParams() {
    try {
        const annonces = await prisma.mandat.findMany({
            where: {
                publishedInWebSite: true,
                isNotAvailable: false
            },
            select: { mandat_numero: true }
        });
        return annonces.map(mandat => ({ slug: mandat.mandat_numero }));
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

interface StructuredDataAnnonce {
    titre: string;
    description?: string;
    prix: number;
    surface: number;
    nb_pieces: number;
    ville: string;
    cp: string;
    caracteristiques?: {
        type: string;
    };
}

// Generate structured data for SEO
function generateStructuredData(annonce: StructuredDataAnnonce) {
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
        const { slug } = await params;
        // Try to find by mandat_numero or by numeric ID
        const mandat = await prisma.mandat.findUnique({
            where: {
                mandat_numero: slug,
            },
            include: { photos: true }
        });

        if (!mandat || !mandat.publishedInWebSite || mandat.isNotAvailable === true) {
            console.log('Mandat not found or not available:', {
                exists: !!mandat,
                published: mandat?.publishedInWebSite,
                notAvailable: mandat?.isNotAvailable
            });
            return notFound();
        }

        // Find similar properties with better filtering
        let similaires: MandatWithPhotos[] = [];

        try {
            similaires = await prisma.mandat.findMany({
                where: {
                    id: { not: mandat.id },
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
                        id: { not: mandat.id },
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

        const annonceData = {
            id: mandat.id,
            titre: `${mandat.type_bien} ${mandat.nb_pieces || 0} pièces`,
            prix: mandat.prix,
            surface: mandat.surface_habitable || 0,
            nb_pieces: mandat.nb_pieces || 0,
            ville: mandat.ville,
            cp: mandat.cp?.toString() || '',
            description: mandat.corps || undefined,
            photos: mandat.photos.map((photo: { id: number; src: string }) => ({
                id: photo.id,
                url: photo.src || '/placeholder.jpg',
                alt: `${mandat.type_bien} ${mandat.nb_pieces || 0} pièces - Photo ${photo.id}`
            })),
            caracteristiques: {
                // Informations générales
                type: mandat.type_bien,
                type_offre: mandat.type_offre,
                statut: mandat.statut || undefined,
                annee_construction: mandat.annee_construction || undefined,
                meuble: mandat.meuble ?? undefined,

                // Surfaces et pièces
                surface_habitable: mandat.surface_habitable ?? undefined,
                nb_pieces: mandat.nb_pieces ?? undefined,
                chambres: mandat.chambres ?? undefined,
                sdb: mandat.sdb ?? undefined,
                wc: mandat.wc ?? undefined,

                // Extérieurs et équipements
                balcon: mandat.balcon ?? undefined,
                terrasse: mandat.terrasse ?? undefined,
                piscine: mandat.piscine ?? undefined,
                parking: mandat.parking ?? undefined,

                // Bâtiment
                etage: mandat.etage ?? undefined,
                nb_etages: mandat.nb_etages ?? undefined,
                ascenseur: mandat.ascenseur ?? undefined,
                exposition: mandat.exposition || undefined,

                // Confort et équipements
                cuisine: mandat.cuisine ?? undefined,
                chauffage: mandat.energie_chauffage || undefined,
                format_chauffage: mandat.format_chauffage || undefined,

                // Financier
                charges: mandat.charges || undefined,
                foncier: mandat.foncier || undefined,

                // Services
                visite_immediat: mandat.visite_immediat ?? undefined,
                video_link: mandat.video_link || undefined
            }
        };

        const similairesData = similaires.map(similaire => ({
            id: similaire.id,
            slug: similaire.mandat_numero,
            titre: `${similaire.type_bien} ${similaire.nb_pieces} pièces`,
            prix: similaire.prix || 0,
            surface: similaire.surface_habitable || 0,
            ville: similaire.ville || 'Non spécifié',
            photos: similaire.photos.map(photo => ({
                id: photo.id,
                url: photo.src || '/placeholder.jpg',
                alt: `${similaire.type_bien} ${similaire.nb_pieces} pièces - Photo ${photo.id}`
            }))
        }));

        const structuredData = generateStructuredData(annonceData);

        return (
            <>
                <script
                    id="structured-data"
                    type="application/ld+json"
                    suppressHydrationWarning={true}
                >
                    {JSON.stringify(structuredData)}
                </script>
                <TheoAnnonceDetail
                    annonce={annonceData}
                    similaires={similairesData}
                />
            </>
        );
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_NOT_FOUND') {
            return notFound();
        }
        console.error('Error in AnnoncePage:', error);
        return <TheoAnnonceDetailFallback />;
    }
}
