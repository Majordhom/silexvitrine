import { prisma } from "@/app/_lib/prisma";
import { AnnonceTableRow } from "./_component/annonceTableRow";

export default async function Annonces() {
    const annonces = await prisma.mandat.findMany({
        orderBy: { dateMaj: "desc" },
        include: { photos: true },
        take: 30,
    });

    return (
        <div className="bg-gradient-to-tr from-fuchsia-50 from-5% via-white via-50% to-fuchsia-50 to-95% grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl">
                <h1 className="text-4xl font-bold text-center sm:text-left">Page des Annonces</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {annonces.map((annonce) => (
                        <AnnonceTableRow
                            key={annonce.id}
                            annonce={{
                                id: annonce.id,
                                reference: annonce.reference,
                                typeBien: annonce.typeBien,
                                prix: annonce.prix,
                                ville: annonce.ville,
                                cp: annonce.cp,
                                nbPieces: annonce.nbPieces,
                                surfaceHabitable: annonce.surfaceHabitable,
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