"use client";

import { useRouter } from "next/navigation";
import {useEffect, useState} from "react";
import { Button } from "@/app/_lib/ui-kit/components/button";
import { SelectMultiple } from "@/app/_lib/ui-kit/components/select";

export default function RechercheAccueil() {
    const router = useRouter();

    // States pour les sélections
    const [typesBien, setTypesBien] = useState<string[]>([]);
    const [secteurs, setSecteurs] = useState<string[]>([]);

    // States des options à récupérer depuis API
    const [typeBienOptions, setTypeBienOptions] = useState<{ key: string; label: string }[]>([]);
    const [secteurOptions, setSecteurOptions] = useState<{ key: string; label: string }[]>([]);

    // Chargement des options de filtres depuis API
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [typesRes, secteursRes] = await Promise.all([
                    fetch("/api/filtres/type-bien"),
                    fetch("/api/filtres/secteurs"),
                ]);

                if (!typesRes.ok || !secteursRes.ok) {
                    throw new Error("Erreur lors du chargement des filtres");
                }

                const [typesData, secteursData] = await Promise.all([
                    typesRes.json(),
                    secteursRes.json(),
                ]);

                setTypeBienOptions(typesData);
                setSecteurOptions(secteursData);
            } catch (error) {
                console.error("Erreur chargement filtres :", error);
            }
        };

        fetchOptions();
    }, []);

    // Fonction pour construire l'URL et rediriger vers la page des annonces
    const handleSearch = async () => {

        const searchParams = new URLSearchParams();
        typesBien.forEach((type) => searchParams.append("type_bien", type));
        secteurs.forEach((secteur) => searchParams.append("secteurs", secteur));

        try {
            // Envoi des states de recherche à l'API pour enregistrement
            await fetch('/api/data-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type_bien: typesBien,
                    secteurs: secteurs,
                }),
            });

            // Redirection vers la page annonces (comportement existant)
            router.push(`/annonces?${searchParams.toString()}`);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la recherche:", error);
            // On redirige quand même même si l'enregistrement a échoué
            router.push(`/annonces?${searchParams.toString()}`);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 w-full">
                <SelectMultiple
                    label="Quel type de bien ?"
                    values={typesBien}
                    onChange={(keys) => setTypesBien(keys)}
                    options={typeBienOptions}
                    placeholder="Type de bien"
                    className="flex-1"
                    aria-label="Sélectionnez le type de bien"
                />

                <SelectMultiple
                    label="Ville, arrondissement"
                    values={secteurs}
                    onChange={(keys) => setSecteurs(keys)}
                    options={secteurOptions}
                    placeholder="Ville ou secteur"
                    className="flex-1"
                    aria-label="Sélectionnez une ville ou un secteur"
                />
            </div>

            <Button
                onClick={handleSearch}
                variant="solid"
                color="primary"
                className="px-8 py-3 text-lg rounded-full z-10"
                aria-label="Découvrir les annonces"
            >
                DÉCOUVREZ NOS ANNONCES
            </Button>
        </div>
    );
}
