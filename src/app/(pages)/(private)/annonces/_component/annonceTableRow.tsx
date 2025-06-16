import { AnnonceCardHeader } from "./annonceCardHeader";
import Link from "next/link";

export type Annonce = {
    id: number;
    reference: string;
    type_bien: string;
    prix: number;
    ville: string;
    cp: number | null;
    nb_pieces: number | null;
    surface_habitable: number | null;
    photos?: { src: string }[];
};

export function AnnonceTableRow({ annonce }: { annonce: Annonce }) {
    return (
        <Link href={`/annonces/${annonce.id}`}>
            <AnnonceCardHeader annonce={annonce} />
        </Link>
    );
}
