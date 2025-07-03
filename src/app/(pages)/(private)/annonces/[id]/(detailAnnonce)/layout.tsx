import { prisma } from '@/app/_lib/prisma';
import type { Metadata } from "next";

// Props attendues par le layout
type LayoutProps = {
    children: React.ReactNode;
    params: { id: string };
};

// Génère dynamiquement les métadonnées de la page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // Conversion de l'id dans l'URL en nombre (base 10)
    const id = parseInt(params.id, 10);

    // Mandat correspondant à l'id depuis BDD
    const mandat = await prisma.mandat.findUnique({
        where: { id },
        select: { type_bien: true, nb_pieces: true, surface_habitable: true }
    });

    // Si mandat non trouvé
    if (!mandat) {
        return { title: "Annonce introuvable" };
    }

    // Déstructuration
    const { type_bien, nb_pieces, surface_habitable } = mandat;

    // Construit dynamiquement le titre à partir des infos mandat
    const title = `${type_bien ?? ''} ${nb_pieces ?? ''} pièces ${surface_habitable ?? ''} m²`.trim();

    // Retourne l'objet Metadata avec le title
    return { title };
}
export default async function Layout({ children }: LayoutProps) {
    // Affiche simplement les enfants sans modification
    return <>{children}</>;
}