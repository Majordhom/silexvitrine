export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header skeleton */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Photo Gallery skeleton */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                        </div>

                        {/* Property Info skeleton */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="space-y-4">
                                <div>
                                    <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="text-center">
                                            <div className="w-12 h-8 bg-gray-200 rounded animate-pulse mx-auto mb-1"></div>
                                            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mx-auto"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description skeleton */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="space-y-2">
                                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Characteristics skeleton */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="w-1/3 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="flex justify-between py-2 border-b border-gray-100">
                                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Sidebar skeleton */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i}>
                                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                                <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Properties skeleton */}
                <div className="mt-12">
                    <div className="w-1/3 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                                <div className="p-4 space-y-3">
                                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 