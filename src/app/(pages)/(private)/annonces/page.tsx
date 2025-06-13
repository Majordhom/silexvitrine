import { prisma } from "@/app/_lib/prisma";
import { AnnonceTableRow } from "./_component/annonceTableRow";
import ModalSearch from "@/app/_lib/components/modalSearch";


export default async function Annonces() {
    const annonces = await prisma.mandat.findMany({
        orderBy: { dateMaj: "desc" },
        include: { photos: true },
        take: 30,
    });


    console.log("info annonces", annonces)

    return (
        <div>
            <main className="flex flex-col bg-white gap-[32px] row-start-2 items-center mx-auto">
                <h1 className="text-4xl font-bold text-center sm:text-left">Page des Annonces</h1>
                <ModalSearch />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 min-w-2/3">
                    {annonces.map((annonce) => (
                        <AnnonceTableRow
                            key={annonce.id}
                            annonce={{
                                id: annonce.id,

                                reference: annonce.reference,
                                type_bien: annonce.type_bien,
                                prix: annonce.prix,
                                ville: annonce.ville,
                                cp: annonce.cp,
                                nb_pieces: annonce.nb_pieces,
                                surface_habitable: annonce.surface_habitable,
                                photos: annonce.photos,
                            }}
                        />
                    ))}
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}