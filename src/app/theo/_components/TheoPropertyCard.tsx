"use client";

interface PropertyCardProps {
    id: number;
    type: string;
    location: string;
    tags: string[];
}

export default function TheoPropertyCard({ id, type, location, tags }: PropertyCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200">
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                    <div className="font-semibold">{type}</div>
                    <div className="text-sm opacity-90">{location}</div>
                </div>
                <button className="absolute bottom-4 right-4 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors">
                    En decouvrir plus
                </button>
            </div>
        </div>
    );
} 