"use client";
import { useEffect, useState } from "react";
import { Input } from "@/app/_lib/ui-kit/components/input";
import { Select } from "@/app/_lib/ui-kit/components/select";
import { Button } from "@/app/_lib/ui-kit/components/button";

const nb_piecesOptions = [
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6 et +" },
];

const type_bienOptions = [
    { key: "Appartement", label: "Appartement" },
    { key: "Villa", label: "Villa" },
    { key: "Maison", label: "Maison" },
    { key: "Rez-de-jardin", label: "Rez-de-Jardin" },
    { key: "Studio", label: "Studio" },
    { key: "Chambre", label: "Chambre" },
    { key: "Duplex", label: "Duplex" },
    { key: "Loft", label: "Loft" },
    { key: "Parking", label: "Parking" },
    { key: "Cave", label: "Cave" },
    { key: "Garage", label: "Garage" },
    { key: "Immeuble", label: "Immeuble" },
    { key: "Commerce", label: "Commerce" },
    { key: "Terrain", label: "Terrain constructible" },
    { key: "Local-activite", label: "Local d'activité" },
];

// const energie_chauffageOptions = [
//     { key: "accumulateurs", label: "Accumulateurs" },
//     { key: "air-pulse", label: "Air pulsé" },
//     { key: "clim-reversible", label: "Climatisation réversible" },
//     { key: "convecteur", label: "Convecteur" },
//     { key: "fluide-caloporteur", label: "Fluide caloporteur" },
//     { key: "plafond", label: "Plafond" },
//     { key: "pompe-a-chaleur", label: "Pompe à chaleur" },
//     { key: "rayonnement", label: "Rayonnement" },
//     { key: "sol-plafond", label: "Au sol et plafond" },
//     { key: "au-sol", label: "Au sol" },
//     { key: "cheminee", label: "Cheminée" },
//     { key: "insert", label: "Insert" },
//     { key: "poele", label: "Poêle" },
//     { key: "radiateur", label: "Radiateur" },
// ];

const initialState = {
    nb_pieces: "",
    type_bien: "",
    //energie_chauffage: "",
    prixMin: "",
    prixMax: "",
    secteur: "",
};

type SearchFormProps = {
    onSubmit?: (values: any) => void;
    initialValues?: Partial<typeof initialState>;
};

const SearchForm = ({ onSubmit, initialValues }: SearchFormProps) => {
    const [values, setValues] = useState(initialState);

    // Met à jour le state si initialValues change
    useEffect(() => {
        if (initialValues) {
            setValues((prev) => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

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
                value={values.nb_pieces}
                onChange={(v) => handleChange("nb_pieces", v || "")}
                options={nb_piecesOptions}
                placeholder="Sélectionnez..."
            />
            <Select
                label="Type de bien"
                value={values.type_bien}
                onChange={(v) => handleChange("type_bien", v || "")}
                options={type_bienOptions}
                placeholder="Sélectionnez..."
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/*<Select*/}
            {/*    label="Type de chauffage"*/}
            {/*    value={values.energie_chauffage}*/}
            {/*    onChange={(v) => handleChange("energie_chauffage", v || "")}*/}
            {/*    options={energie_chauffageOptions}*/}
            {/*    placeholder="Sélectionnez..."*/}
            {/*/>*/}
            <Input
                label="Secteur"
                value={values.secteur}
                onChange={(v) => handleChange("secteur", v)}
                placeholder="Ex : 75000"
                type="text"
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