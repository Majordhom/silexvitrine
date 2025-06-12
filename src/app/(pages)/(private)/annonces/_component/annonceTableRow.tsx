import { AnnonceCardHeader } from "./annonceCardHeader";

export type Annonce = {
    id: number;
    reference: string;
    type_bien: string;
    prix: number;
    ville: string;
    cp?: number;
    nb_pieces?: number;
    surface_habitable?: number;
    photos?: { src: string }[];
};

export function AnnonceTableRow({ annonce }: { annonce: Annonce }) {
    return <AnnonceCardHeader annonce={annonce} />;
}
