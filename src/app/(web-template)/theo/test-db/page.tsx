import { prisma } from "@/app/_lib/prisma";

export default async function TestDBPage() {
    try {
        // Test database connection
        const annonces = await prisma.mandat.findMany({
            take: 10,
            select: {
                id: true,
                titre: true,
                prix: true,
                ville: true,
                cp: true,
                type_bien: true,
                nb_pieces: true,
                surface: true
            }
        });

        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Database Test</h1>
                    
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Database Connection Status</h2>
                        <p className="text-green-600">✅ Database connection successful</p>
                        <p className="text-gray-600 mt-2">Found {annonces.length} annonces in database</p>
                    </div>

                    {annonces.length > 0 ? (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Available Annonces</h2>
                            <div className="space-y-4">
                                {annonces.map((annonce) => (
                                    <div key={annonce.id} className="border-b border-gray-200 pb-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {annonce.titre || `Annonce ${annonce.id}`}
                                                </h3>
                                                <p className="text-gray-600">
                                                    {annonce.ville} {annonce.cp} - {annonce.type_bien}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {annonce.nb_pieces} pièces, {annonce.surface} m²
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-blue-600">
                                                    {annonce.prix?.toLocaleString()} €
                                                </p>
                                                <a 
                                                    href={`/theo/annonces/${annonce.id}`}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Voir l'annonce
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4 text-yellow-800">No Annonces Found</h2>
                            <p className="text-yellow-700">
                                The database is connected but no annonces were found. 
                                You may need to import data or check the database schema.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Database Test</h1>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-red-800">Database Connection Error</h2>
                        <p className="text-red-700 mb-4">
                            Failed to connect to the database or query annonces.
                        </p>
                        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                            {error instanceof Error ? error.message : String(error)}
                        </pre>
                    </div>
                </div>
            </div>
        );
    }
} 