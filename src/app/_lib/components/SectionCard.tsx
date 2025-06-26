import React from "react";
import ImageDummy from "./ImageDummy";

// Props attendues par le composant SectionCard
type SectionCardProps = {
    title: string;
    text: string;
    imageAlt?: string;
    imageComponent?: React.ReactNode; // Composant image personnalisé
};

// Composant fonctionnel SectionCard
const SectionCard: React.FC<SectionCardProps> = ({ title, text, imageAlt, imageComponent }) => (
    <div className="card-base">
        <h1 className="text-xl md:text-2xl font-semibold mb-4 text-primary">{title}</h1>
        {imageComponent ?? <ImageDummy alt={imageAlt ?? title} />}
        <p className="text-gray-700 mt-4">{text}</p>
    </div>
);

export default SectionCard;