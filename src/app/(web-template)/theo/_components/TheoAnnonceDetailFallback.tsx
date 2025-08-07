"use client";
import TheoAnnonceDetail from './TheoAnnonceDetail';

export default function TheoAnnonceDetailFallback() {
    // Mock data for testing the UI
    const mockAnnonce = {
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

    const mockSimilaires = [
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

    return (
        <>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            <strong>Mode test :</strong> Affichage avec des données de démonstration car aucune annonce trouvée en base de données.
                        </p>
                    </div>
                </div>
            </div>
            <TheoAnnonceDetail 
                annonce={mockAnnonce}
                similaires={mockSimilaires}
            />
        </>
    );
} 