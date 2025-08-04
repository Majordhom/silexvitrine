"use client";
import TheoPropertyCard from "./TheoPropertyCard";

interface Property {
    id: number;
    type: string;
    location: string;
    tags: string[];
}

interface PropertiesSectionProps {
    properties: Property[];
    title?: string;
}

export default function TheoPropertiesSection({ properties, title = "Nos derniers biens" }: PropertiesSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
                    {title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {properties.map((property) => (
                        <TheoPropertyCard
                            key={property.id}
                            id={property.id}
                            type={property.type}
                            location={property.location}
                            tags={property.tags}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 