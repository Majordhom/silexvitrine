"use client";
// import {useState, useEffect} from "react";
import ScrollDownButton from "@/app/_lib/ui-kit/components/ScrollDownButton";
import {AnnonceCardHeader} from "@/app/arthur/annonces/_component/annonceCardHeader";
import {Annonce} from "@/app/arthur/annonces/_component/annonceTableRow";
import AnnonceScroller from "@/app/_lib/components/annonceScroller";
import RechercheAccueil from "@/app/_lib/components/rechercheAccueil";
import {useQuery} from "@tanstack/react-query";

export default function Accueil() {
    // const [annoncesRecentes, setAnnoncesRecentes] = useState<Annonce[]>([]);
    //
    // useEffect(() => {
    //     fetch("/api/mandats/recent")
    //         .then(res => res.json())
    //         .then(setAnnoncesRecentes); // equivalent à .then(data => setAnnoncesRecentes(data))
    // }, []);

    const { data: annoncesRecentes = [] } = useQuery({
        queryKey: ['annoncesRecentes'],
        queryFn: async () => {
            const response = await fetch("/api/mandats/recent");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des annonces récentes");
            }
            return response.json();
        },
        staleTime: 24 * 60 * 60 * 1000, // 24 heures avant de considérer les données obsolètes
    });

    return (
        <div className="w-full max-w-5xl flex flex-col px-auto mx-auto gap-8">
            <div className="background-accueil-degrade w-full flex flex-col items-center justify-center text-center gap-8 p-20 md:p-24 lg:p-32 xl:p-40 2xl:p-48 rounded-2xl min-w-0">
                <h1 className="text-4xl font-bold text-primary">Trouvez votre maison de rêve aujourd'hui</h1>
                <p className="text-base max-w-xl text-blackWarm z-10">
                    Explorez notre vaste sélection de propriétés à vendre. Utilisez notre module de recherche intégré
                    pour affiner vos résultats et découvrir la maison parfaite qui vous attend.
                </p>
                <div className="flex flex-row items-center gap-4 p-6 bg-transparent w-full">
                    <RechercheAccueil/>
                </div>
            </div>

            <div className="flex justify-center my-8">
                <ScrollDownButton sectionId="biens-recents"/>
            </div>

            <div id="biens-recents" className="mt-16">
                <h2 className="text-3xl text-primary font-semibold mb-6 text-center">Découvrez nos derniers biens</h2>
                <p className="text-base max-w-xl text-blackWarm mx-auto text-center mb-8">
                    Explorez notre sélection de propriétés récemment publiées. Chacune d'elles offre un cadre de vie
                    unique et moderne.
                </p>
                <AnnonceScroller className="flex gap-10 overflow-x-auto scroll-smooth snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                    {annoncesRecentes.map((annonce: Annonce) => (
                        <div key={annonce.id} className="flex-shrink-0 w-[300px] snap-start md:w-auto">
                            <AnnonceCardHeader annonce={annonce}/>
                        </div>
                    ))}
                </AnnonceScroller>
            </div>
        </div>
    );
}