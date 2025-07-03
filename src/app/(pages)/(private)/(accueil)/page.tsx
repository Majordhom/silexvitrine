"use client";
import ModalSearch from "@/app/_lib/components/modalSearch";
import {Input} from "@/app/_lib/ui-kit/components/input";
import {Search} from "lucide-react";
import {useState, useEffect} from "react";
import ScrollDownButton from "@/app/_lib/ui-kit/components/ScrollDownButton";
import {AnnonceCardHeader} from "@/app/(pages)/(private)/annonces/_component/annonceCardHeader";
import {Annonce} from "@/app/(pages)/(private)/annonces/_component/annonceTableRow";
import AnnonceScroller from "@/app/_lib/components/annonceScroller";
import RechercheAccueil from "@/app/_lib/components/rechercheAccueil";

export default function Accueil() {
    const [searchValue, setSearchValue] = useState("");
    const handleChange = (value: string) => {
        setSearchValue(value);
    }

    const [annoncesRecentes, setAnnoncesRecentes] = useState<Annonce[]>([]);
    useEffect(() => {
        const fetchMandats = async () => {
            const res = await fetch("/api/mandats/recent");
            const data = await res.json();
            setAnnoncesRecentes(data);
        };

        fetchMandats();
    }, []);

    return (
        <div className="w-full max-w-5xl flex flex-col px-auto mx-auto gap-8">
            <div
                className="background-accueil-degrade w-full flex flex-col items-center justify-center text-center gap-8 p-20 md:p-24 lg:p-32 xl:p-40 2xl:p-48 rounded-2xl min-w-0">
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
                <ScrollDownButton/>
            </div>

            <div id="biens-recents" className="mt-16">
                <h2 className="text-3xl text-primary font-semibold mb-6 text-center">Découvrez nos derniers biens</h2>
                <p className="text-base max-w-xl text-blackWarm mx-auto text-center mb-8">
                    Explorez notre sélection de propriétés récemment publiées. Chacune d'elles offre un cadre de vie
                    unique et moderne.
                </p>
                <AnnonceScroller
                    className="flex gap-10 overflow-x-auto scroll-smooth snap-x md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible"
                    children={annoncesRecentes.map((annonce) => (
                        <div key={annonce.id} className="flex-shrink-0 w-[300px] snap-start md:w-auto">
                            <AnnonceCardHeader annonce={annonce}/>
                        </div>
                    ))}

                />
            </div>
        </div>
    );
}