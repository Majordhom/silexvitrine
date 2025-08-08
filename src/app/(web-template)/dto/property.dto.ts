/**
 * Property related DTOs
 */

export interface AnnoncePhoto {
    id: number;
    url: string;
    alt?: string;
}

export interface PropertyCharacteristics {
    // Informations générales
    type?: string;
    type_offre?: string;
    statut?: string;
    annee_construction?: string;
    meuble?: boolean;
    
    // Surfaces et pièces
    surface_habitable?: number;
    nb_pieces?: number;
    chambres?: number;
    sdb?: number;
    wc?: number;
    
    // Extérieurs et équipements
    balcon?: number;
    terrasse?: number;
    piscine?: boolean;
    parking?: number;
    
    // Bâtiment
    etage?: number;
    nb_etages?: number;
    ascenseur?: boolean;
    exposition?: string;
    
    // Confort et équipements
    cuisine?: number;
    chauffage?: string;
    format_chauffage?: string;
    
    // Financier
    charges?: string;
    foncier?: number;
    
    // Services
    visite_immediat?: boolean;
    video_link?: string;
}

export interface Property {
    id: number;
    titre: string;
    prix: number;
    surface: number;
    nb_pieces: number;
    ville: string;
    cp: string;
    slug?: string;
    photos: AnnoncePhoto[];
    tags?: string[];
    description?: string;
    caracteristiques?: PropertyCharacteristics;
}

export interface PropertyDetailAnnonce extends Property {
    description?: string;
    caracteristiques?: PropertyCharacteristics;
}

export interface SimilarProperty {
    id: number;
    slug?: string;
    titre: string;
    prix: number;
    surface: number;
    ville: string;
    photos: AnnoncePhoto[];
}

export interface AnnonceDetailProps {
    annonce: PropertyDetailAnnonce;
    similaires?: SimilarProperty[];
}

export interface PropertyCardProps {
    property: Property;
    showTags?: boolean;
}

export interface TheoPropertiesSectionProps {
    properties: Property[];
    title?: string;
    subtitle?: string;
    loading?: boolean;
}

export interface PropertyGridCardProps {
    id: number;
    type: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    surface: string;
}