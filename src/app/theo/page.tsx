"use client";
import { Home, Users, Calendar } from "lucide-react";
import TheoHeader from "./_components/TheoHeader";
import TheoHero from "./_components/TheoHero";
import TheoPropertiesSection from "./_components/TheoPropertiesSection";
import TheoBlogSection from "./_components/TheoBlogSection";
import TheoFeaturesSection from "./_components/TheoFeaturesSection";

export default function TheoAccueil() {
    // Simulation des données d'annonces récentes
    const annoncesRecentes = [
        {
            id: 1,
            type: "Maison 230m²",
            location: "13008 dzdzadz",
            tags: ["jardin", "piscine", "terrasse", "1 étage"]
        },
        {
            id: 2,
            type: "Maison 230m²",
            location: "13008 dzdzadz",
            tags: ["jardin", "piscine", "terrasse", "1 étage"]
        },
        {
            id: 3,
            type: "Maison 230m²",
            location: "13008 dzdzadz",
            tags: ["jardin", "piscine", "terrasse", "1 étage"]
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
            title: "Marché de l'immobilier à Cabriès: Analyse et Tendances",
            description: "Découvrez les dernières tendances du marché immobilier à Cabriès. Notre analyse complète vous donne les clés pour comprendre l'évolution des prix et les opportunités d'investissement."
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
            <TheoPropertiesSection properties={annoncesRecentes} />
            <TheoBlogSection posts={blogPosts} />
            <TheoFeaturesSection features={features} />
        </div>
    );
}