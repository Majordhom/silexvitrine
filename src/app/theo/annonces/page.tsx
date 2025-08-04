"use client";
import { useQuery } from "@tanstack/react-query";
import TheoHeader from "../_components/TheoHeader";
import TheoSearchBar from "../_components/TheoSearchBar";
import TheoPropertyGridCard from "../_components/TheoPropertyGridCard";

export default function TheoAnnonces() {
    const { data: annonces = [] } = useQuery({
        queryKey: ['annonces'],
        queryFn: async () => {
            const response = await fetch("/api/mandats/recent");
            if (!response.ok) {
                throw new Error("Erreur lors du chargement des annonces");
            }
            return response.json();
        },
        staleTime: 24 * 60 * 60 * 1000,
    });

    // Données simulées pour l'exemple
    const mockProperties = [
        {
            id: 1,
            type: "Maison moderne avec jardin",
            location: "13008 Marseille",
            price: "450 000 €",
            bedrooms: 4,
            bathrooms: 2,
            surface: "230m²"
        },
        {
            id: 2,
            type: "Appartement de standing",
            location: "13008 Marseille",
            price: "320 000 €",
            bedrooms: 3,
            bathrooms: 1,
            surface: "120m²"
        },
        {
            id: 3,
            type: "Villa avec piscine",
            location: "13008 Marseille",
            price: "680 000 €",
            bedrooms: 5,
            bathrooms: 3,
            surface: "280m²"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <TheoHeader />

            {/* Search Section */}
            <section className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Nos Propriétés
                    </h1>
                    
                    <TheoSearchBar />
                </div>
            </section>

            {/* Properties Grid */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {mockProperties.map((property) => (
                            <TheoPropertyGridCard
                                key={property.id}
                                id={property.id}
                                type={property.type}
                                location={property.location}
                                price={property.price}
                                bedrooms={property.bedrooms}
                                bathrooms={property.bathrooms}
                                surface={property.surface}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}