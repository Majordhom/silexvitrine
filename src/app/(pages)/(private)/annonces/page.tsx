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
            <main className="flex flex-col bg-white gap-[32px] row-start-2 items-center mx-auto px-8 sm:px-8 lg:px-0">
                <div className="w-full max-w-5xl flex flex-col gap-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold text-left">Découvrez nos biens</h1>
                            <p className="text-left">Explorez notre sélection de propriétés récemment publiées. Chacune
                                d&#39;elles offre un cadre de vie unique et moderne.</p>
                        </div>
                        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                            <ModalSearch/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}