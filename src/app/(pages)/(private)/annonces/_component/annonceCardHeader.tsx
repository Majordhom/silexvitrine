import Image from "next/image";
import { Annonce } from "./annonceTableRow";

export function AnnonceCardHeader({ annonce }: { annonce: Annonce }) {
    console.log(annonce);
    return (
        <div className="w-64 aspect-square bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
            {/* Photo (2/3 du haut) */}
            <div className="relative w-full" style={{ height: "66%" }}>
                {annonce.photos && annonce.photos.length > 0 ? (
                    <Image
                        src={annonce.photos[0].src}
                        alt="photo"
                        fill
                        className="object-cover w-full h-full rounded-t-2xl"
                        sizes="256px"
                        priority
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 rounded-t-2xl">
                        Pas de photo
                    </div>
                )}
            </div>
            {/* Infos (1/3 du bas) */}
            <div className="flex flex-col justify-center items-center flex-1 px-3 py-2 gap-1">
                <div className="text-xl font-bold text-primary">{annonce.prix.toLocaleString()}€</div>
                <div className="text-sm text-gray-700">
                    {annonce.typeBien}
                    {annonce.surfaceHabitable ? ` • ${annonce.surfaceHabitable} m²` : ""}
                </div>
                <div className="text-xs text-gray-500">
                    {annonce.cp} {annonce.ville}
                </div>
            </div>
        </div>
    );
}