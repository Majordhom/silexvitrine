// import { Mandat, MandatPhoto } from "@prisma/client"
import {prisma} from "@/app/_lib/prisma"
import {notFound} from 'next/navigation'
import {Carousel} from "@/app/_lib/ui-kit/components/carousel";
import ContactForm from "@/app/_lib/components/contactForm";
import {AnnonceCardHeader} from "@/app/theo/annonces/_component/annonceCardHeader";
import AnnoncesScroller from "@/app/_lib/components/annonceScroller";
import MapAnnonce from "@/app/_lib/components/mapAnnonce";
import {calculateHaversineDistance, isValidCoordinate} from "@/app/_lib/utils/geo";
import {Mandat, MandatPhoto} from "@/generated/prisma";

type PageProps = {
    params?: Promise<any>;
};

type MandatWithPhotos = Mandat & {
    photos: MandatPhoto[]
    distance?: number
    scoreProximite?: number
};

// Ça génère toutes les pages /annonces/1, /annonces/2… à la build.
export async function generateStaticParams() {
    const annonces = await prisma.mandat.findMany({
        select: {id: true}
    })
    return annonces.map(mandat => ({params: {id: mandat.id.toString()}}))
}

// Fonction pour nettoyer la description
// const cleanDescription = (text?: string) => {
//     if (!text) return "Pas de description disponible.";
//
//     // On enlève tous les blocs entourés de * au début ou dans le texte
//     let cleaned = text.replace(/(\s*\.?\s*)?\*+[^*]+\*+/gi, '');
//
//     // On enlève les mentions textuelles indésirables (maj / min insensible)
//     const mentions = [
//         "VENDU PAR NOTRE AGENCE",
//         "SOUS OFFRE",
//         "SOUS COMPROMIS",
//         "A été vendu en all inclusive\\.",
//     ];
//
//     const mentionsRegex = new RegExp(`(\\s*\\.?\\s*)?(${mentions.join('|')})`, 'gi');
//     cleaned = cleaned.replace(mentionsRegex, '');
//
//     // Nettoyer les espaces multiples éventuels restants
//     cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
//
//     return cleaned || "Pas de description disponible.";
// };


export default async function AnnoncePage({params}: PageProps) {

    // const id = Number(params.id)
    // if (isNaN(id)) return notFound()
    const {id} = await Promise.resolve(params)

    const mandatId = Number(id);
    if (isNaN(mandatId)) return notFound();

    const mandat = await prisma.mandat.findUnique({
        where: {id: mandatId},
        include: {photos: true}
    })

    if (!mandat) return notFound()

    let similaires: MandatWithPhotos[] = [];

    if (!isValidCoordinate(mandat.latitude) || !isValidCoordinate(mandat.longitude)) {
        // Fallback par code postal
        similaires = await prisma.mandat.findMany({
            where: {
                id: {not: mandatId},
                cp: mandat.cp,
                nb_pieces: mandat.nb_pieces,
                prix: {gte: mandat.prix * 0.85, lte: mandat.prix * 1.15}
            },
            take: 3,
            include: {photos: true}
        });
    } else {
        similaires = await prisma.mandat.findMany({
            where: {
                id: {not: mandatId},
                prix: {gte: mandat.prix * 0.85, lte: mandat.prix * 1.15},
                nb_pieces: mandat.nb_pieces,
                latitude: {not: null}, // <-- Filtre non-null
                longitude: {not: null}  // <-- Filtre non-null
            },
            take: 100,
            include: {photos: true}
        });

        // On filtre les biens similaires pour ne garder que ceux à moins de 1km
        similaires = similaires
            .map(m => ({
                ...m,
                distance: calculateHaversineDistance(
                    mandat.latitude!,
                    mandat.longitude!,
                    m.latitude!, // On peut utiliser ! car déjà filtré
                    m.longitude!
                )
            }))
            .filter(m => m.distance <= 1) // 1km max
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 3);
    }


    const subjectOptions = [
        {key: 'ref-mandat: ' + mandat.reference, label: mandat.reference},
        {key: 'autre', label: 'autre'}
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Colonne gauche */}
                <div className="w-full lg:w-2/3 flex flex-col gap-8">
                    {mandat.photos.length > 0
                        ? (<Carousel photos={mandat.photos}/>)
                        : (<div
                            className={`w-full bg-gray-200 text-textLight rounded-2xl flex items-center justify-center w-[500px] min-h-96 h-96 p-6 text-center`}>Pas
                            de photos</div>)
                    }

                    {/* Bloc infos + carte + formulaire en mobile */}
                    <div className="block lg:hidden bg-gray-100 rounded-xl space-y-4">
                        <div className="p-8">
                            <h2 className="text-3xl font-bold">
                                {mandat.prix.toLocaleString()} €
                            </h2>
                            <h2 className="text-gray-600 text-2xl">{mandat.cp} {mandat.ville}</h2>
                            <p className="text-sm font-bold text-primary">Ref : {mandat.reference}</p>

                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-2">Description</h2>
                                <p>{mandat.corps ?? "Pas de description disponible."}</p>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-xl font-semibold mb-2">Caractéristiques</h2>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><strong>Type :</strong> {mandat.type_bien}</p>
                                    <p><strong>Étage :</strong> {mandat.etage ?? 'NC'}/{mandat.nb_etages ?? 'NC'}</p>
                                    <p><strong>Surface :</strong> {mandat.surface_habitable ?? 'NC'} m²</p>
                                    <p><strong>Pièces :</strong> {mandat.nb_pieces ?? 'NC'}</p>
                                    <p><strong>Foncier :</strong> {mandat.foncier ?? 'NC'} €</p>
                                    <p><strong>Chauffage :</strong> {mandat.format_chauffage ?? 'NC'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-8">
                            <MapAnnonce latitude={mandat.latitude ?? 43.2965} longitude={mandat.longitude ?? 5.3698}/>
                        </div>
                        <ContactForm
                            className="w-full"
                            subjectOptions={subjectOptions}
                            defaultSubject={subjectOptions[0].key}
                        />
                    </div>
                    <div className="hidden lg:block">
                        <MapAnnonce latitude={mandat.latitude ?? 43.2965} longitude={mandat.longitude ?? 5.3698}/>
                    </div>

                    <div className="rounded-xl">
                        {similaires.length > 0 && (
                            <>
                                <h2 className="text-xl font-semibold mb-2">Biens similaires</h2>
                                <AnnoncesScroller
                                    className="flex gap-10 overflow-x-auto scroll-smooth snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
                                    children={similaires.map((annonce) => (
                                        <div key={annonce.id} className="flex-shrink-0 w-[300px] snap-start md:w-auto">
                                            <AnnonceCardHeader annonce={annonce}/>
                                        </div>
                                    ))}
                                />
                                {/*<AnnoncesScroller*/}
                                {/*    className="flex gap-10 overflow-x-auto scroll-smooth snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"*/}
                                {/*    children={similaires.map((annonce) => {*/}
                                {/*        const distance = calculateHaversineDistance(*/}
                                {/*            mandat.latitude!,*/}
                                {/*            mandat.longitude!,*/}
                                {/*            annonce.latitude!,*/}
                                {/*            annonce.longitude!*/}
                                {/*        );*/}

                                {/*        return (*/}
                                {/*            <div key={annonce.id} className="flex-shrink-0 w-[300px] snap-start md:w-auto">*/}
                                {/*                <AnnonceCardHeader annonce={annonce} />*/}
                                {/*                <p className="text-sm text-gray-500 mt-1">*/}
                                {/*                    À {distance.toFixed(1)} km*/}
                                {/*                </p>*/}
                                {/*            </div>*/}
                                {/*        );*/}
                                {/*    })}*/}
                                {/*/>*/}

                            </>
                        )}
                    </div>
                </div>

                {/* Colonne droite */}
                <div className="w-full lg:w-1/3 flex flex-col gap-8 rounded-2xl bg-gray-100">
                    {/* Bloc infos desktop */}
                    <div className="hidden lg:block rounded-xl space-y-4 p-8">
                        <h2 className="text-3xl font-bold">
                            {mandat.prix.toLocaleString()} €
                        </h2>
                        <h2 className="text-gray-600 text-2xl">{mandat.cp} {mandat.ville}</h2>
                        <p className="text-sm font-bold text-primary">Ref-{mandat.reference}</p>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p>{mandat.corps ?? "Pas de description disponible."}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Caractéristiques</h2>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <p><strong>Type :</strong> {mandat.type_bien}</p>
                                <p><strong>Étage :</strong> {mandat.etage ?? 'NC'}/{mandat.nb_etages ?? 'NC'}</p>
                                <p><strong>Surface :</strong> {mandat.surface_habitable ?? 'NC'} m²</p>
                                <p><strong>Pièces :</strong> {mandat.nb_pieces ?? 'NC'}</p>
                                <p><strong>Foncier :</strong> {mandat.foncier ?? 'NC'} €</p>
                                <p><strong>Chauffage :</strong> {mandat.format_chauffage ?? 'NC'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulaire de contact */}
                    <ContactForm
                        className="w-full hidden lg:block"
                        subjectOptions={subjectOptions}
                        defaultSubject={subjectOptions[0].key}
                    />
                </div>
            </div>
        </div>
    )
}