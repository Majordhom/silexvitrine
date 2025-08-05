"use client";
import TheoPropertyCard from './TheoPropertyCard';

interface Property {
    id: number;
    titre: string;
    prix: number;
    surface: number;
    nb_pieces: number;
    ville: string;
    cp: string;
    photos: Array<{
        id: number;
        url: string;
        alt?: string;
    }>;
    tags?: string[];
}

interface TheoPropertiesSectionProps {
    properties: Property[];
    title?: string;
    subtitle?: string;
}

export default function TheoPropertiesSection({ 
    properties, 
    title = "Nos propriétés", 
    subtitle = "Découvrez notre sélection de biens d'exception" 
}: TheoPropertiesSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <TheoPropertyCard 
                            key={property.id} 
                            property={property}
                            showTags={true}
                        />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-12">
                    <a
                        href="/theo/annonces"
                        className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                        Voir toutes nos propriétés
                    </a>
                </div>
            </div>
        </section>
    );
} 