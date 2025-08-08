"use client";

export default function TheoPropertyCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-enhanced-pulse">
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-breathing"></div>
                {/* Favorite button placeholder */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full animate-breathing"></div>
                {/* Tags placeholder */}
                <div className="absolute bottom-3 left-3">
                    <div className="w-16 h-5 bg-gray-300 rounded-full animate-breathing"></div>
                </div>
            </div>

            {/* Content placeholder */}
            <div className="p-4 space-y-3">
                {/* Title placeholder */}
                <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4 animate-breathing"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-breathing" style={{ animationDelay: '0.2s' }}></div>
                </div>

                {/* Price placeholder */}
                <div className="h-6 bg-gray-300 rounded w-1/3 animate-breathing" style={{ animationDelay: '0.4s' }}></div>

                {/* Location placeholder */}
                <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-breathing" style={{ animationDelay: '0.6s' }}></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-breathing" style={{ animationDelay: '0.8s' }}></div>
                </div>

                {/* Features placeholder */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-breathing" style={{ animationDelay: '1s' }}></div>
                            <div className="h-4 bg-gray-200 rounded w-8 animate-breathing" style={{ animationDelay: '1.2s' }}></div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <div className="w-4 h-4 bg-gray-200 rounded animate-breathing" style={{ animationDelay: '1.4s' }}></div>
                            <div className="h-4 bg-gray-200 rounded w-10 animate-breathing" style={{ animationDelay: '1.6s' }}></div>
                        </div>
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-breathing" style={{ animationDelay: '1.8s' }}></div>
                </div>
            </div>
        </div>
    );
}