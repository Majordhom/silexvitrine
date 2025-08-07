import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, BookOpen, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { BlogPost, blogPosts } from '../../../data';



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

    // Get related posts
    const relatedPosts = blogPosts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            
            <div className="min-h-screen bg-gray-50">
                {/* Enhanced Header */}
                <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <Link 
                                href="/theo/blog"
                                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                            >
                                <ArrowLeft size={20} />
                                <span>Retour au blog</span>
                            </Link>
                            
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <Eye size={16} />
                                    <span>{post.views?.toLocaleString() || '1.2k'} vues</span>
                                </div>
                                <button className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-all duration-200">
                                    <Heart size={20} />
                                </button>
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
                        <div className="aspect-[16/9] bg-gray-200 overflow-hidden relative">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                    {post.category}
                                </span>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="p-8">
                            {/* Title */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {/* Enhanced Meta */}
                            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-8 pb-6 border-b border-gray-200">
                                <div className="flex items-center space-x-6">
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
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Eye size={16} />
                                        <span>{post.views?.toLocaleString() || '1.2k'}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Heart size={16} />
                                        <span>{post.likes || 89}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div 
                                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                            >
                                {post.blocks.map((block, i) => {
                                    if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>;
                                    if (block.type === 'subheading') return <h3 key={i}>{block.text}</h3>;
                                    if (block.type === 'paragraph') return <p key={i}>{block.text}</p>;
                                    if (block.type === 'list') return <ul key={i}>{block.items?.map((item, j) => <li key={j}>{item}</li>)}</ul>;
                                    return null;
                                })}
                            </div>

                            {/* Enhanced Social Share */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Partager cet article</h3>
                                <div className="flex flex-wrap gap-4">
                                    <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        <Facebook size={18} />
                                        <span>Facebook</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
                                        <Twitter size={18} />
                                        <span>Twitter</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200">
                                        <Linkedin size={18} />
                                        <span>LinkedIn</span>
                                    </button>
                                    <button className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                        <Share2 size={18} />
                                        <span>Copier le lien</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Articles similaires</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <article key={relatedPost.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="aspect-[16/9] bg-gray-200 overflow-hidden">
                                            <img
                                                src={relatedPost.imageUrl}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="mb-3">
                                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                    {relatedPost.category}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                                                <Link href={`/theo/blog/${relatedPost.slug}`} className="hover:text-blue-600 transition-colors duration-200">
                                                    {relatedPost.title}
                                                </Link>
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{relatedPost.author}</span>
                                                <span>{relatedPost.readTime}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Newsletter Signup */}
                    <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">Restez informé</h3>
                            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                                Recevez nos derniers articles et conseils immobiliers directement dans votre boîte mail.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Votre adresse email"
                                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                                />
                                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    S'abonner
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 