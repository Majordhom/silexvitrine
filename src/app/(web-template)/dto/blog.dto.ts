/**
 * Blog related DTOs
 */

export interface BlogContentBlock {
    type: 'heading' | 'subheading' | 'paragraph' | 'list';
    text?: string;
    items?: string[];
}

export interface BlogPost {
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
    blocks: BlogContentBlock[];
    views?: number;
    likes?: number;
    featured?: boolean;
    description?: string;
}

export interface SimpleBlogPost {
    id: number;
    title: string;
    description: string;
}

export interface BlogSectionProps {
    posts: SimpleBlogPost[];
    title?: string;
}