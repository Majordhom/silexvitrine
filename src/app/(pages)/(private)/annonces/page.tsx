import { prisma } from "@/app/_lib/prisma";
import { AnnonceTableRow } from "./_component/annonceTableRow";
import ModalSearch from "@/app/_lib/components/modalSearch";

const PAGE_SIZE = 12;

export default async function Annonces({
                                           searchParams,
                                       }: {
    searchParams: any;
}) {
    // Correction : attendre searchParams si c'est une Promise
    const params = await searchParams;
    const page = Math.max(1, parseInt(params.page || "1", 10));
    const skip = (page - 1) * PAGE_SIZE;

    // Construction dynamique du filtre Prisma
    const where: any = {};
    if (params.nb_pieces) where.nb_pieces = Number(params.nb_pieces);
    if (params.type_bien) where.type_bien = params.type_bien;
    if (params.prixMin) where.prix = { ...where.prix, gte: Number(params.prixMin) };
    if (params.prixMax) where.prix = { ...where.prix, lte: Number(params.prixMax) };
    const secteurs = Array.isArray(params.secteurs)
        ? params.secteurs
        : params.secteurs
            ? [params.secteurs]
            : [];

    if (secteurs.length > 0) {
        where.cp = { in: secteurs.map(Number) };
    }

    const [annonces, total] = await Promise.all([
        prisma.mandat.findMany({
            where,
            orderBy: { dateMaj: "desc" },
            include: { photos: true },
            skip,
            take: PAGE_SIZE,
        }),
        prisma.mandat.count({ where }),
    ]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <div>
            <main className="flex flex-col bg-white gap-[32px] row-start-2 items-center mx-auto px-8 sm:px-8 lg:px-0">
                <div className="w-full max-w-5xl flex flex-col gap-8">
                    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col text-center sm:text-left sm:items-start">
                            <h1 className="text-5xl mb-4 text-primary font-bold">Découvrez nos biens</h1>
                            <p className="text-gray-600">Explorez notre sélection de propriétés récemment publiées.
                                Chacune d&#39;elles offre un cadre de vie unique et moderne.</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end w-full sm:w-auto">
                            <ModalSearch/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {annonces.length === 0 ? (
                            <div className="col-span-full text-center font-semibold text-gray-500 py-12">
                                <span className="text-primary font-bold text-lg">Désolé, il n&#39;y a aucun bien correspondant à votre recherche pour le moment.</span>
                                <br/>
                                Essayez de modifier vos critères de recherche ou revenez plus tard.
                                <br/><br/>
                                Vous pouvez aussi vous inscrire à notre <a href="/newsletter" className="text-primary font-bold text-lg">Newsletter</a> pour être informé des prochains biens disponibles.
                            </div>
                        ) : (
                            annonces.map((annonce) => (
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
                            ))
                        )}
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <a
                            href={`?page=${page - 1}`}
                            className={`px-4 py-2 rounded ${page <= 1 ? "pointer-events-none opacity-50" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Précédent
                        </a>
                        <span className="px-4 py-2">{page} / {totalPages}</span>
                        <a
                            href={`?page=${page + 1}`}
                            className={`px-4 py-2 rounded ${page >= totalPages ? "pointer-events-none opacity-50" : "bg-gray-200 hover:bg-gray-300"}`}
                        >
                            Suivant
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}