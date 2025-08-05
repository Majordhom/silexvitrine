"use client";
import { Home, Users, Calendar } from "lucide-react";
import TheoHeader from "./_components/TheoHeader";
import TheoHero from "./_components/TheoHero";
import TheoPropertiesSection from "./_components/TheoPropertiesSection";
import TheoBlogSection from "./_components/TheoBlogSection";
import TheoFeaturesSection from "./_components/TheoFeaturesSection";

export default function TheoAccueil() {
    // Simulation des données d'annonces récentes avec la nouvelle structure
    const annoncesRecentes = [
        {
            id: 1,
            titre: "Maison moderne 4 pièces",
            prix: 450000,
            surface: 145,
            nb_pieces: 4,
            ville: "Marseille",
            cp: "13008",
            photos: [
                { id: 1, url: "/placeholder.jpg", alt: "Maison moderne" }
            ],
            tags: ["jardin", "piscine", "terrasse", "1 étage"]
        },
        {
            id: 2,
            titre: "Appartement lumineux 3 pièces",
            prix: 280000,
            surface: 85,
            nb_pieces: 3,
            ville: "Marseille",
            cp: "13006",
            photos: [
                { id: 2, url: "/placeholder.jpg", alt: "Appartement lumineux" }
            ],
            tags: ["balcon", "ascenseur", "parking", "vue mer"]
        },
        {
            id: 3,
            titre: "Villa avec jardin 5 pièces",
            prix: 650000,
            surface: 180,
            nb_pieces: 5,
            ville: "Marseille",
            cp: "13012",
            photos: [
                { id: 3, url: "/placeholder.jpg", alt: "Villa avec jardin" }
            ],
            tags: ["jardin", "garage", "terrasse", "2 étages"]
        }
    ];

    // Données des articles de blog
    const blogPosts = [
        {
            id: 1,
            title: "Marché de l'immobilier à Cabriès: Analyse et Tendances",
            description: "Découvrez les dernières tendances du marché immobilier à Cabriès. Notre analyse complète vous donne les clés pour comprendre l'évolution des prix et les opportunités d'investissement."
        },
        {
            id: 2,
            title: "Guide complet pour investir dans l'immobilier en 2024",
            description: "Tout ce que vous devez savoir pour faire un investissement immobilier réussi en 2024. Conseils d'experts et stratégies éprouvées."
        }
    ];

    // Données des fonctionnalités
    const features = [
        {
            id: 1,
            icon: Home,
            title: "Propriétés Premium",
            description: "Sélection rigoureuse de biens d'exception"
        },
        {
            id: 2,
            icon: Users,
            title: "Accompagnement Personnalisé",
            description: "Expertise et conseils sur mesure"
        },
        {
            id: 3,
            icon: Calendar,
            title: "Disponibilité 24/7",
            description: "Service client réactif et disponible"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <TheoHeader />
            <TheoHero />
            <TheoPropertiesSection 
                properties={annoncesRecentes}
                title="Nos propriétés récentes"
                subtitle="Découvrez notre sélection de biens d'exception"
            />
            <TheoBlogSection posts={blogPosts} />
            <TheoFeaturesSection features={features} />
        </div>
    );
}