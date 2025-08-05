import { prisma } from '@/app/_lib/prisma';
import type { Metadata } from "next";
import TheoHeader from "@/app/(web-template)/theo/_components/TheoHeader";

// Props attendues par le layout
type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
};

// Generate dynamic metadata for annonce pages
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    try {
        const id = parseInt((await params).id, 10);
        
        const mandat = await prisma.mandat.findUnique({
            where: { id },
            select: { 
                type_bien: true, 
                nb_pieces: true, 
                surface_habitable: true, 
                titre: true,
                prix: true,
                ville: true,
                cp: true,
                description: true
            }
        });

        if (!mandat) {
            return { 
                title: "Annonce introuvable - SilexVitrine",
                description: "Cette annonce n'existe pas ou a été supprimée."
            };
        }

        const { type_bien, nb_pieces, surface_habitable, titre, prix, ville, cp, description } = mandat;
        const title = titre || `${type_bien ?? ''} ${nb_pieces ?? ''} pièces ${surface_habitable ?? ''} m²`.trim();
        const location = `${ville} ${cp}`;
        const price = prix ? `${prix.toLocaleString()} €` : '';
        
        // Clean description for SEO
        const cleanDescription = description 
            ? description.replace(/(\s*\.?\s*)?\*+[^*]+\*+/gi, '').replace(/\s{2,}/g, ' ').trim()
            : `Découvrez cette ${type_bien?.toLowerCase() || 'propriété'} de ${nb_pieces} pièces à ${location}. Surface de ${surface_habitable} m².`;

        const seoTitle = `${title} à ${location} - ${price} | SilexVitrine`;
        const seoDescription = `${cleanDescription} ${price ? `Prix : ${price}.` : ''} Contactez-nous pour plus d'informations.`;

        return { 
            title: seoTitle,
            description: seoDescription,
            keywords: `${type_bien}, ${ville}, ${nb_pieces} pièces, ${surface_habitable} m², immobilier ${ville}, ${type_bien} ${ville}`,
            openGraph: {
                title: seoTitle,
                description: seoDescription,
                url: `https://silexvitrine.com/theo/annonces/${id}`,
                siteName: 'SilexVitrine',
                locale: 'fr_FR',
                type: 'website',
                images: [
                    {
                        url: '/og-image-annonce.jpg',
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: seoTitle,
                description: seoDescription,
                images: ['/og-image-annonce.jpg'],
            },
            alternates: {
                canonical: `/theo/annonces/${id}`,
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        };
    } catch (error) {
        return { 
            title: "Annonce - SilexVitrine",
            description: "Découvrez cette propriété exceptionnelle à Marseille."
        };
    }
}

export default async function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <TheoHeader />
            <div className="pt-16">
                {children}
            </div>
        </div>
    );
}