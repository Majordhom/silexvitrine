/**
 * UI Components related DTOs
 */

import * as LucideIcons from "lucide-react";

export interface Feature {
    id: number;
    iconName: keyof typeof LucideIcons;
    title: string;
    description: string;
}

export interface FeaturesSectionProps {
    features: Feature[];
}

export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    background: string;
    image: string;
}