import { AnnonceCardHeader } from "./annonceCardHeader";

export type Annonce = {
    id: number;
    reference: string;
    typeBien: string;
    prix: number;
    ville: string;
    cp?: number;
    nbPieces?: number;
    surfaceHabitable?: number;
    photos?: { src: string }[];
};

export function AnnonceTableRow({ annonce }: { annonce: Annonce }) {
    return <AnnonceCardHeader annonce={annonce} />;
}
