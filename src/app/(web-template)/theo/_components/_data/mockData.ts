export const mockAnnonce = {
    id: 5,
    titre: "Maison moderne 4 pièces avec jardin",
    prix: 450000,
    surface: 145,
    nb_pieces: 4,
    ville: "Marseille",
    cp: "13008",
    description: "Magnifique maison moderne de 145m² située dans un quartier calme de Marseille. Cette propriété dispose de 4 pièces, un jardin paysager, une terrasse et un garage. Idéale pour une famille, elle offre un excellent rapport qualité-prix dans un secteur recherché.",
    photos: [
        { id: 1, url: "/placeholder.jpg", alt: "Vue extérieure de la maison" },
        { id: 2, url: "/placeholder.jpg", alt: "Séjour lumineux" },
        { id: 3, url: "/placeholder.jpg", alt: "Cuisine équipée" },
        { id: 4, url: "/placeholder.jpg", alt: "Jardin paysager" }
    ],
    caracteristiques: {
        type: "Maison",
        etage: 1,
        cuisine: 1,
        chauffage: "Individuel",
        foncier: 1200,
        surface_habitable: 145,
        chambres: 3,
        sdb: 2,
        wc: 2,
        balcon: 0,
        terrasse: 1,
        piscine: false,
        parking: 1,
        nb_etages: 2,
        ascenseur: false,
        exposition: "Sud",
        annee_construction: "2015",
        meuble: false,
        visite_immediat: true
    }
};

export const mockSimilaires = [
    {
        id: 1,
        titre: "Appartement lumineux 3 pièces",
        prix: 280000,
        surface: 85,
        ville: "Marseille",
        photos: [{ id: 1, url: "/placeholder.jpg", alt: "Appartement lumineux" }]
    },
    {
        id: 2,
        titre: "Villa avec piscine 5 pièces",
        prix: 650000,
        surface: 180,
        ville: "Marseille",
        photos: [{ id: 2, url: "/placeholder.jpg", alt: "Villa avec piscine" }]
    },
    {
        id: 3,
        titre: "Maison de ville 6 pièces",
        prix: 520000,
        surface: 160,
        ville: "Marseille",
        photos: [{ id: 3, url: "/placeholder.jpg", alt: "Maison de ville" }]
    }
];