import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    publishedAt: string;
    category: string;
    readTime: string;
    imageUrl: string;
    fullContent: string;
}

// Mock blog data - in real app this would come from CMS or API
const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'marche-immobilier-cabries-analyse-tendances',
        title: "Marché de l'immobilier à Cabriès : Analyse et Tendances",
        excerpt: "Découvrez les dernières tendances du marché immobilier à Cabriès. Notre analyse complète vous donne les clés pour comprendre l'évolution des prix et les opportunités d'investissement.",
        content: "Le marché immobilier de Cabriès connaît une dynamique exceptionnelle...",
        fullContent: `
            <h2>Un marché immobilier dynamique</h2>
            <p>Le marché immobilier de Cabriès connaît une dynamique exceptionnelle depuis plusieurs années. Cette commune des Bouches-du-Rhône, située à seulement 15 kilomètres d'Aix-en-Provence, attire de plus en plus d'acheteurs en quête d'un cadre de vie privilégié.</p>
            
            <p>En 2024, les prix moyens s'établissent à :</p>
            <ul>
                <li><strong>Maisons :</strong> 4 500 €/m²</li>
                <li><strong>Appartements :</strong> 3 800 €/m² à 4 200 €/m²</li>
            </ul>
            
            <h2>Les raisons de l'attractivité de Cabriès</h2>
            <p>Plusieurs facteurs expliquent le succès de Cabriès auprès des acheteurs :</p>
            
            <ul>
                <li><strong>Environnement de vie exceptionnel :</strong> Paysages verts et tranquillité à proximité de la métropole</li>
                <li><strong>Localisation géographique idéale :</strong> Proximité des autoroutes, gare TGV et aéroport Marseille-Provence</li>
                <li><strong>Offre variée :</strong> Maisons de caractère, villas contemporaines et appartements dans des résidences de standing</li>
                <li><strong>Équipements nombreux :</strong> Installations sportives et culturelles, vie associative dynamique</li>
            </ul>
            
            <h2>Perspectives pour 2025</h2>
            <p>Les experts prévoient une poursuite de la hausse des prix, portée par :</p>
            <ul>
                <li>La demande croissante de familles et cadres</li>
                <li>La proximité des pôles économiques (Aix-en-Provence, Marseille)</li>
                <li>La qualité de vie offerte par la commune</li>
            </ul>
        `,
        author: "Lino Reporter",
        publishedAt: "2025-04-23",
        category: "Analyse de marché",
        readTime: "5 min",
        imageUrl: "/placeholder.jpg"
    },
    {
        id: '2',
        slug: 'guide-investir-immobilier-2024',
        title: "Guide complet pour investir dans l'immobilier en 2024",
        excerpt: "Tout ce que vous devez savoir pour faire un investissement immobilier réussi en 2024. Conseils d'experts et stratégies éprouvées.",
        content: "L'investissement immobilier reste l'un des placements les plus sûrs...",
        fullContent: `
            <h2>Pourquoi investir dans l'immobilier en 2024 ?</h2>
            <p>L'investissement immobilier reste l'un des placements les plus sûrs et rentables, même en période d'incertitude économique. Voici pourquoi 2024 est une année propice à l'investissement :</p>
            
            <h2>Les stratégies d'investissement gagnantes</h2>
            <ul>
                <li><strong>Location classique :</strong> Revenus réguliers et plus-value à long terme</li>
                <li><strong>Location saisonnière :</strong> Rentabilité optimisée dans les zones touristiques</li>
                <li><strong>Rénovation et revente :</strong> Plus-value rapide sur des biens à potentiel</li>
            </ul>
            
            <h2>Conseils pour réussir son investissement</h2>
            <p>Pour maximiser vos chances de succès :</p>
            <ul>
                <li>Étudiez attentivement la localisation</li>
                <li>Analysez la rentabilité brute et nette</li>
                <li>Prévoyez les frais annexes (taxes, charges, travaux)</li>
                <li>Diversifiez votre portefeuille immobilier</li>
            </ul>
        `,
        author: "Marie Dubois",
        publishedAt: "2025-04-20",
        category: "Conseils",
        readTime: "8 min",
        imageUrl: "/placeholder.jpg"
    }
];

// Generate static params for all blog posts
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return {
            title: "Article introuvable - SilexVitrine",
            description: "Cet article n'existe pas ou a été supprimé."
        };
    }

    return {
        title: `${post.title} | SilexVitrine`,
        description: post.excerpt,
        keywords: `${post.category}, immobilier, ${post.title.toLowerCase()}, conseils immobilier, marché immobilier`,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://silexvitrine.com/theo/blog/${post.slug}`,
            siteName: 'SilexVitrine',
            locale: 'fr_FR',
            type: 'article',
            images: [
                {
                    url: post.imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.imageUrl],
        },
        alternates: {
            canonical: `/theo/blog/${post.slug}`,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

// Generate structured data for blog posts
function generateStructuredData(post: BlogPost) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.imageUrl,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "SilexVitrine",
            "logo": {
                "@type": "ImageObject",
                "url": "https://silexvitrine.com/logo.png"
            }
        },
        "datePublished": post.publishedAt,
        "dateModified": post.publishedAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://silexvitrine.com/theo/blog/${post.slug}`
        }
    };

    return structuredData;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const structuredData = generateStructuredData(post);

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <Link 
                                href="/theo/blog"
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                <ArrowLeft size={20} />
                                <span>Retour au blog</span>
                            </Link>
                            
                            <div className="flex items-center space-x-4">
                                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Article Header */}
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Hero Image */}
                        <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Article Content */}
                        <div className="p-8">
                            {/* Category */}
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {post.title}
                            </h1>

                            {/* Meta */}
                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <User size={16} />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Calendar size={16} />
                                    <span>{formatDate(post.publishedAt)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock size={16} />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div 
                                className="prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.fullContent }}
                            />

                            {/* Social Share */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Partager cet article</h3>
                                <div className="flex space-x-4">
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        <Facebook size={16} />
                                        <span>Facebook</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
                                        <Twitter size={16} />
                                        <span>Twitter</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                                        <Linkedin size={16} />
                                        <span>LinkedIn</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
} 