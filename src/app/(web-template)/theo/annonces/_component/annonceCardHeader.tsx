import Image from "next/image";
import { Annonce } from "./annonceTableRow";
import Link from "next/link";

export function AnnonceCardHeader({ annonce }: { annonce: Annonce }) {
    console.log(annonce);
    return (
        <Link href={`/theo/annonces/${annonce.id}`} className="h-full w-full">
            <div className="h-full w-full aspect-square bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
                <div className="relative w-full" style={{ height: "66%" }}>
                    {annonce.photos && annonce.photos.length > 0 ? (
                        <Image
                            src={annonce.photos[0].src}
                            alt="photo"
                            fill
                            className="object-cover w-full h-full rounded-2xl"
                            sizes="256px"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 rounded-t-2xl">
                            Pas de photo
                        </div>
                    )}
                </div>
                <div className="flex flex-col justify-center flex-1 px-3 py-2 gap-1">
                    <div className="text-xl font-bold text-primary">{annonce.prix.toLocaleString()}€</div>
                    <div className="text-sm text-gray-700">
                        {annonce.type_bien}
                        {annonce.nb_pieces ? ` • ${annonce.nb_pieces}   pièces` : ""}
                        {annonce.surface_habitable ? ` • ${annonce.surface_habitable} m²` : ""}
                    </div>
                    <div className="text-xs text-gray-500">
                        {annonce.cp} {annonce.ville}
                    </div>
                </div>
            </div>
        </Link>
    );
}