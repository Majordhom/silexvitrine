import { prisma } from "@/app/_lib/prisma";
import TheoHeader from "./_components/TheoHeader";
import TheoHero from "./_components/TheoHero";
import TheoPropertiesSection from "./_components/TheoPropertiesSection";
import TheoBlogSection from "./_components/TheoBlogSection";
import TheoFeaturesSection from "./_components/TheoFeaturesSection";

async function getRecentProperties() {
    const properties = await prisma.mandat.findMany({
        where: {
            publishedInWebSite: true,
            isNotAvailable: false
        },
        include: {
            photos: true
        },
        orderBy: {
            dateMaj: 'desc'
        },
        take: 6
    });

    return properties.map(property => ({
        id: property.id,
        slug: property.mandat_numero, // Ajouter le slug manquant
        titre: `${property.type_bien} ${property.nb_pieces} pièces`,
        prix: property.prix,
        surface: property.surface_habitable || 0,
        nb_pieces: property.nb_pieces || 0,
        ville: property.ville,
        cp: property.cp?.toString() || '',
        photos: property.photos.map(photo => ({
            id: photo.id,
            url: photo.src || '/placeholder.jpg',
            alt: `${property.type_bien} ${property.nb_pieces} pièces - Photo ${photo.id}`
        })),
        tags: [property.type_offre, property.type_bien]
    }));
}

const features: Array<{
    id: number;
    iconName: keyof typeof import("lucide-react");
    title: string;
    description: string;
}> = [
    {
        id: 1,
        iconName: "Building2",
        title: "Des biens d'exception",
        description: "Une sélection rigoureuse des meilleures propriétés de la région."
    },
    {
        id: 2,
        iconName: "MapPin",
        title: "Expertise locale",
        description: "Une connaissance approfondie du marché immobilier local."
    },
    {
        id: 3,
        iconName: "PiggyBank",
        title: "Accompagnement financier",
        description: "Des conseils personnalisés pour votre projet immobilier."
    }
];

const blogPosts = [
    {
        id: 1,
        title: "Le marché immobilier à Cabries : analyse et tendances",
        description: "Découvrez notre analyse détaillée du marché immobilier à Cabries et ses environs. Prix, tendances et perspectives."
    },
    {
        id: 2,
        title: "Guide : Investir dans l'immobilier en 2024",
        description: "Nos conseils d'experts pour réussir votre investissement immobilier cette année."
    }
];

export default async function TheoAccueil() {
    const annoncesRecentes = await getRecentProperties();
    
    return (
        <div className="min-h-screen bg-white">
            <TheoHeader />
            <TheoHero />
            <TheoPropertiesSection 
                properties={annoncesRecentes}
                title="Nos propriétés récentes"
                subtitle="Découvrez notre sélection de biens d'exception"
            />
            {/* <TheoBlogSection posts={blogPosts} /> */}
            <TheoFeaturesSection features={features} />
        </div>
    );
}