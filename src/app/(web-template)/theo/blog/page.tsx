"use client";
import { useState } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

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
}

export default function TheoBlogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Mock blog data - in real app this would come from CMS or API
    const blogPosts: BlogPost[] = [
        {
            id: '1',
            slug: 'marche-immobilier-cabries-analyse-tendances',
            title: "Marché de l'immobilier à Cabriès : Analyse et Tendances",
            excerpt: "Découvrez les dernières tendances du marché immobilier à Cabriès. Notre analyse complète vous donne les clés pour comprendre l'évolution des prix et les opportunités d'investissement.",
            content: "Le marché immobilier de Cabriès connaît une dynamique exceptionnelle...",
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
            author: "Marie Dubois",
            publishedAt: "2025-04-20",
            category: "Conseils",
            readTime: "8 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '3',
            slug: 'quartiers-marseille-investissement',
            title: "Les meilleurs quartiers de Marseille pour investir en 2024",
            excerpt: "Notre sélection des quartiers les plus prometteurs de Marseille pour votre investissement immobilier. Analyse détaillée et conseils pratiques.",
            content: "Marseille offre une diversité de quartiers aux profils très différents...",
            author: "Pierre Martin",
            publishedAt: "2025-04-18",
            category: "Investissement",
            readTime: "6 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '4',
            slug: 'renovation-maison-valeur-ajoutee',
            title: "Rénovation : Comment ajouter de la valeur à votre bien",
            excerpt: "Les travaux de rénovation qui rapportent le plus. Guide pratique pour maximiser la valeur de votre bien immobilier.",
            content: "La rénovation peut considérablement augmenter la valeur d'un bien...",
            author: "Sophie Laurent",
            publishedAt: "2025-04-15",
            category: "Rénovation",
            readTime: "7 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '5',
            slug: 'credit-immobilier-taux-2024',
            title: "Crédit immobilier : Les taux en 2024 et nos conseils",
            excerpt: "Tout savoir sur les taux de crédit immobilier en 2024. Conseils pour négocier et optimiser votre emprunt.",
            content: "Les taux de crédit immobilier évoluent constamment...",
            author: "Thomas Bernard",
            publishedAt: "2025-04-12",
            category: "Financement",
            readTime: "4 min",
            imageUrl: "/placeholder.jpg"
        },
        {
            id: '6',
            slug: 'achat-vente-immobilier-etapes',
            title: "Achat ou vente : Les étapes clés d'une transaction immobilière",
            excerpt: "Guide complet des étapes d'une transaction immobilière. De la recherche à la signature, tout ce qu'il faut savoir.",
            content: "Une transaction immobilière suit un processus bien défini...",
            author: "Julie Moreau",
            publishedAt: "2025-04-10",
            category: "Conseils",
            readTime: "9 min",
            imageUrl: "/placeholder.jpg"
        }
    ];

    const categories = [
        { id: 'all', name: 'Tous les articles' },
        { id: 'analyse-de-marche', name: 'Analyse de marché' },
        { id: 'conseils', name: 'Conseils' },
        { id: 'investissement', name: 'Investissement' },
        { id: 'renovation', name: 'Rénovation' },
        { id: 'financement', name: 'Financement' }
    ];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || 
                               post.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Blog Immobilier
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez nos analyses, conseils et actualités du marché immobilier à Marseille et ses environs
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un article..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="lg:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                {/* Image */}
                                <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Category */}
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                            {post.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                                        <Link href={`/theo/blog/${post.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Meta */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-1">
                                                <User size={14} />
                                                <span>{post.author}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={14} />
                                                <span>{formatDate(post.publishedAt)}</span>
                                            </div>
                                        </div>
                                        <span>{post.readTime}</span>
                                    </div>

                                    {/* Read More */}
                                    <Link 
                                        href={`/theo/blog/${post.slug}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Lire la suite
                                        <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Aucun article trouvé
                        </h3>
                        <p className="text-gray-600">
                            Essayez de modifier vos critères de recherche
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
} 