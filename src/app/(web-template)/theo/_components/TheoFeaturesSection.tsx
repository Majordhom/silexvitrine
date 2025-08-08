"use client";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { FeaturesSectionProps, Feature } from '../../dto';

export default function TheoFeaturesSection({ features }: FeaturesSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const IconComponent = LucideIcons[feature.iconName] as LucideIcon;

                        // Fallback au cas où l'icône n'existe pas
                        if (!IconComponent || typeof IconComponent !== 'function') {
                            return (
                                <div key={feature.id} className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <LucideIcons.AlertCircle className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            );
                        }

                        return (
                            <div key={feature.id} className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <IconComponent className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 