import { prisma } from "@/app/_lib/prisma";
import { AnnonceTableRow } from "./_component/annonceTableRow";
import ModalSearch from "@/app/_lib/components/modalSearch";

// Nb d'annonces par page
const PAGE_SIZE = 12;

// Fonction URL de pagination
function buildPageUrl(params: Record<string, any>, page: number) {
    const url = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (key === "page") continue; // On ignore le paramètre page ici, il sera ajouté à la fin
        if (Array.isArray(value)) {
            value.forEach(v => url.append(key, v)); // Ajoute chaque valeur du tableau
        } else if (value !== undefined && value !== null) {
            url.append(key, value); // Ajoute la valeur si elle existe
        }
    }
    url.set("page", String(page)); // Ajoute le numéro de page à la fin
    return `?${url.toString()}`;
}

// Composant principal
export default async function Annonces({ searchParams }: { searchParams: any }) {
    // On récupère les paramètres de recherche
    const params = await searchParams;
    // On calcule la page courante (par défaut 1)
    const page = Math.max(1, parseInt(params.page || "1", 10));
    // Et on calcule le nb d'éléments à ignorer pour la pagination
    const skip = (page - 1) * PAGE_SIZE;

    // On construit du filtre pour la requête Prisma
    const where: any = {};
    if (params.nb_pieces) where.nb_pieces = Number(params.nb_pieces); // Filtre nb de pièces

    // if (params.type_bien) where.type_bien = params.type_bien; // Filtre type de bien
    // j'ai modifié la ligne au dessus pour gérer le cas où type_bien est un tableau ou une chaîne de caractères
    if (params.type_bien) {
        const typesBien = Array.isArray(params.type_bien)
            ? params.type_bien
            : [params.type_bien];
        where.type_bien = { in: typesBien };
    }
    if (params.prixMin) where.prix = { ...where.prix, gte: Number(params.prixMin) }; // Prix min
    if (params.prixMax) where.prix = { ...where.prix, lte: Number(params.prixMax) }; // Prix max

    // Filtre sur les secteurs (codes postaux)
    const secteurs = Array.isArray(params.secteurs)
        ? params.secteurs
        : params.secteurs
            ? [params.secteurs]
            : [];
    if (secteurs.length > 0) { // On vérifie si la liste des secteurs contient au moins un élément
        // On filtre les codes postaux présents dans la liste secteurs
        where.cp = { in: secteurs.map(Number).filter((n: number) => !isNaN(n)) };
    } // On convertit les secteurs en nombres et on filtre les NaN pour construire le filtre Prisma : where.cp = { in: [*****, *****] }; (***** = code postal)

    // On récupère les annonces et leur nombre total
    const [annonces, total] = await Promise.all([
        prisma.mandat.findMany({
            where, // Filtres appliqués
            orderBy: { dateMaj: "desc" },
            include: { photos: true },
            skip, // Décalage pour la pagination
            take: PAGE_SIZE,
        }),
        prisma.mandat.count({ where }), // Nb total d'annonces trouvées
    ]);

    // Calcule le nb de pages
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));


    return (
        <div>
            <main className="flex flex-col bg-white gap-[32px] row-start-2 items-center mx-auto px-8 sm:px-8 lg:px-0">
                <div className="w-full max-w-5xl flex flex-col gap-8">
                    {/* En-tête de la page */}
                    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col text-center sm:text-left sm:items-start">
                            <h1 className="text-5xl mb-4 text-primary font-bold">Découvrez nos biens</h1>
                            <p className="text-gray-600">
                                Explorez notre sélection de propriétés récemment publiées.
                                Chacune d&#39;elles offre un cadre de vie unique et moderne.
                            </p>
                        </div>
                        {/* Bouton recherche avancée */}
                        <div className="mt-4 sm:mt-0 flex justify-center sm:justify-end w-full sm:w-auto">
                            <ModalSearch/>
                        </div>
                    </div>
                    {/* Grille d'annonces */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {annonces.length === 0 ? (
                            // Message si aucune annonce trouvée
                            <div className="col-span-full text-center font-semibold text-gray-500 py-12">
                                <span className="text-primary font-bold text-lg">
                                    Désolé, il n&#39;y a aucun bien correspondant à votre recherche pour le moment.
                                </span>
                                <br/>
                                Essayez de modifier vos critères de recherche ou revenez plus tard.
                                <br/><br/>
                                Vous pouvez aussi vous inscrire à notre <a href="/newsletter" className="text-primary font-bold text-lg">Newsletter</a> pour être informé des prochains biens disponibles.
                            </div>
                        ) : (
                            // Affichage des annonces
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
                    {/* Pagination */}
                    <div className="flex justify-center gap-4 mt-6">
                        <a  href={buildPageUrl(params, page - 1)}
                            className={`px-4 py-2 rounded ${page <= 1 ? "pointer-events-none opacity-50" : "bg-primary text-white hover:bg-gray-300 hover:text-black"}`}
                            aria-disabled={page <= 1}
                        >
                            Précédent
                        </a>
                        <span className="px-4 py-2">{page} / {totalPages}</span>
                        <a  href={buildPageUrl(params, page + 1)}
                            className={`px-4 py-2 rounded ${page >= totalPages ? "pointer-events-none opacity-50" : "bg-primary text-white hover:bg-gray-300 hover:text-black"}`}
                            aria-disabled={page >= totalPages}
                        >
                            Suivant
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}