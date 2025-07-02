"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/app/_lib/ui-kit/components/button";
import { SelectMultiple } from "@/app/_lib/ui-kit/components/select";

export default function RechercheAccueil() {
    const router = useRouter();

    // States pour les sélections
    const [typesBien, setTypesBien] = useState<string[]>([]);
    const [secteurs, setSecteurs] = useState<string[]>([]);

    // Valeurs mock pour l'instant (remplacées par API en étape 2)
    const typeBienOptions = [
        { key: "Maison", label: "Maison" },
        { key: "Appartement", label: "Appartement" },
        { key: "Loft", label: "Loft" },
        { key: "Villa", label: "Villa" },
    ];

    const secteurOptions = [
        { key: "13001", label: "13001" },
        { key: "13007", label: "13007" },
        { key: "13008", label: "13008" },
        { key: "Aix-en-Provence", label: "Aix-en-Provence" },
    ];

    const handleSearch = () => {
        const searchParams = new URLSearchParams();

        typesBien.forEach((type) => searchParams.append("type_bien", type));
        secteurs.forEach((secteur) => searchParams.append("secteurs", secteur));

        router.push(`/annonces?${searchParams.toString()}`);
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Type de bien */}
                <SelectMultiple
                    label="Quel type de bien ?"
                    values={typesBien}
                    onChange={(keys) => setTypesBien(keys)}
                    options={typeBienOptions}
                    placeholder="Type de bien"
                    className="flex-1"
                />

                {/* Ville / arrondissement */}
                <SelectMultiple
                    label="Ville, arrondissement"
                    values={secteurs}
                    onChange={(keys) => setSecteurs(keys)}
                    options={secteurOptions}
                    placeholder="Ville ou secteur"
                    className="flex-1"
                />
            </div>

            {/* Bouton de recherche */}
            <Button
                onClick={handleSearch}
                variant="solid"
                color="primary"
                className="px-8 py-3 text-lg rounded-full"
            >
                DÉCOUVREZ NOS ANNONCES
            </Button>
        </div>
    );
}
