"use client";
import { useState } from "react";
import { Input } from "@/app/_lib/ui-kit/components/input";
import { Select } from "@/app/_lib/ui-kit/components/select";
import { Button } from "@/app/_lib/ui-kit/components/button";

const nbPiecesOptions = [
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6 et +" },
];

const typeBienOptions = [
    { key: "Appartement", label: "Appartement" },
    { key: "Villa", label: "Villa" },
    { key: "Maison", label: "Maison" },
    { key: "Rez-de-Jardin", label: "Rez-de-Jardin" },
    { key: "Studio", label: "Studio" },
    { key: "Chambre", label: "Chambre" },
    { key: "Duplex", label: "Duplex" },
    { key: "Loft", label: "Loft" },
    { key: "Parking", label: "Parking" },
    { key: "Cave", label: "Cave" },
    { key: "Garage", label: "Garage" },
    { key: "Immeuble", label: "Immeuble" },
    { key: "Commerce", label: "Commerce" },
    { key: "Terrain constructible", label: "Terrain constructible" },
    { key: "Local d'activité", label: "Local d'activité" },
];

const energieChauffageOptions = [
    { key: "Accumulateurs", label: "Accumulateurs" },
    { key: "Air pulsé", label: "Air pulsé" },
    { key: "Climatisation réversible", label: "Climatisation réversible" },
    { key: "Convecteur", label: "Convecteur" },
    { key: "Fluide caloporteur", label: "Fluide caloporteur" },
    { key: "Plafond", label: "Plafond" },
    { key: "Pompe à chaleur", label: "Pompe à chaleur" },
    { key: "Rayonnement", label: "Rayonnement" },
    { key: "Au sol et plafond", label: "Au sol et plafond" },
    { key: "Au sol", label: "Au sol" },
    { key: "Cheminée", label: "Cheminée" },
    { key: "Insert", label: "Insert" },
    { key: "Poêle", label: "Poêle" },
    { key: "Radiateur", label: "Radiateur" },
];

const initialState = {
    nbPieces: "",
    typeBien: "",
    energieChauffage: "",
    prixMin: "",
    prixMax: "",
    secteur: "",
};

const SearchForm = ({ onSubmit }: { onSubmit?: (values: any) => void }) => {
    const [values, setValues] = useState(initialState);

    const handleChange = (field: keyof typeof values, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleReset = () => setValues(initialState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) onSubmit(values);
    };

return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
                label="Nombre de pièces"
                value={values.nbPieces}
                onChange={(v) => handleChange("nbPieces", v || "")}
                options={nbPiecesOptions}
                placeholder="Sélectionnez..."
            />
            <Select
                label="Type de bien"
                value={values.typeBien}
                onChange={(v) => handleChange("typeBien", v || "")}
                options={typeBienOptions}
                placeholder="Sélectionnez..."
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
                label="Type de chauffage"
                value={values.energieChauffage}
                onChange={(v) => handleChange("energieChauffage", v || "")}
                options={energieChauffageOptions}
                placeholder="Sélectionnez..."
            />
            <Input
                label="Secteur"
                value={values.secteur}
                onChange={(v) => handleChange("secteur", v)}
                placeholder="Ex : 75000"
                type="text"
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <Input
                label="Prix minimum"
                value={values.prixMin}
                onChange={(v) => handleChange("prixMin", v)}
                placeholder="€"
                type="number"
                min="0"
            />
            <Input
                label="Prix maximum"
                value={values.prixMax}
                onChange={(v) => handleChange("prixMax", v)}
                placeholder="€"
                type="number"
                min="0"
            />
        </div>
        <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="shadow" onClick={handleReset}>
                Réinitialiser la recherche
            </Button>
            <Button type="submit" variant="solid" color="primary">
                Rechercher
            </Button>
        </div>
    </form>
);

};

export default SearchForm;