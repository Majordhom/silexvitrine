"use client";
import { ArrowRight } from "lucide-react";
import { BlogSectionProps } from '../../dto';

export default function TheoBlogSection({ posts, title = "Nos derniers articles de blogs" }: BlogSectionProps) {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
                    {title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {post.title}
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {post.description}
                            </p>
                            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                                Lire la suites de l'articles 
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
} 