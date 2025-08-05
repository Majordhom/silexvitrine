import { prisma } from '@/app/_lib/prisma';
import type { Metadata } from "next";
import TheoHeader from "@/app/theo/_components/TheoHeader";

// Props attendues par le layout
type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
};

// Génère dynamiquement les métadonnées de la page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    try {
        // Conversion de l'id dans l'URL en nombre (base 10)
        const id = parseInt((await params).id, 10);

        // Mandat correspondant à l'id depuis BDD
        const mandat = await prisma.mandat.findUnique({
            where: { id },
            select: { type_bien: true, nb_pieces: true, surface_habitable: true, titre: true }
        });

        // Si mandat non trouvé
        if (!mandat) {
            return { title: "Annonce introuvable - SilexVitrine" };
        }

        // Déstructuration
        const { type_bien, nb_pieces, surface_habitable, titre } = mandat;

        // Construit dynamiquement le titre à partir des infos mandat
        const title = titre || `${type_bien ?? ''} ${nb_pieces ?? ''} pièces ${surface_habitable ?? ''} m²`.trim();

        // Retourne l'objet Metadata avec le title
        return { 
            title: `${title} - SilexVitrine`,
            description: `Découvrez cette propriété exceptionnelle à Marseille. ${title}`
        };
    } catch (error) {
        return { title: "Annonce - SilexVitrine" };
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