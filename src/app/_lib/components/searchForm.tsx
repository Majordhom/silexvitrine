// Composant React : formulaire de recherche pour filtrer des biens immobiliers.
// Utilise des hooks pour gérer l'état local et les effets liés aux valeurs initiales.
"use client";
import { useEffect, useState } from "react";
import { Button } from "@/app/_lib/ui-kit/components/button";
import SearchFormField from "./SearchFormField";
import SecteursInput from "./SecteursInput";

// Options pour le champ "Nombre de pièces"
const nb_piecesOptions = [
    { key: "1", label: "1" },
    { key: "2", label: "2" },
    { key: "3", label: "3" },
    { key: "4", label: "4" },
    { key: "5", label: "5" },
    { key: "6", label: "6 et +" },
];

// Options pour le champ "Type de bien"
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

// État initial du formulaire de recherche
const initialState = {
    nb_pieces: "",
    type_bien: "",
    //energie_chauffage: "",
    prixMin: "",
    prixMax: "",
    secteurs: [] as string[],
};

// Props du composant SearchForm
type SearchFormProps = {
    onSubmit?: (values: any) => void;
    initialValues?: Partial<typeof initialState>;
};

// Composant principal du formulaire
const SearchForm = ({ onSubmit, initialValues }: SearchFormProps) => {
    const [values, setValues] = useState(initialState);

    // Met à jour le state si initialValues change
    useEffect(() => {
        if (initialValues) {
            setValues((prev) => ({ ...prev, ...initialValues }));
        }
    }, [initialValues]);

    // Gère le changement de valeur d'un champ
    const handleChange = (field: keyof typeof values, value: string | string[]) => {
        setValues((prev) => ({ ...prev, [field]: value }));
    };

    // Réinitialise le formulaire
    const handleReset = () => setValues(initialState);

    // Gère la soumission du formulaire
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) onSubmit(values);
    };

// Rendu du formulaire
return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SearchFormField
                type="select"
                label="Nombre de pièces"
                value={values.nb_pieces}
                onChange={(v) => handleChange("nb_pieces", v)}
                options={nb_piecesOptions}
                placeholder="Sélectionnez..."
            />
            <SearchFormField
                type="select"
                label="Type de bien"
                value={values.type_bien}
                onChange={(v) => handleChange("type_bien", v)}
                options={type_bienOptions}
                placeholder="Sélectionnez..."
            />
        </div>

        <div className="grid grid-cols-2 gap-6">
            <SearchFormField
                type="input"
                label="Prix minimum"
                value={values.prixMin}
                onChange={(v) => handleChange("prixMin", v)}
                placeholder="€"
                inputType="number"
                min="0"
            />
            <SearchFormField
                type="input"
                label="Prix maximum"
                value={values.prixMax}
                onChange={(v) => handleChange("prixMax", v)}
                placeholder="€"
                inputType="number"
                min="0"
            />
        </div>

        <div className="grid lg:grid-cols-1 sm:grid-cols-2 gap-6">
            <SecteursInput
                value={values.secteurs}
                onChange={(secteurs) => handleChange("secteurs", secteurs)}
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