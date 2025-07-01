"use client";

import { useEffect } from 'react';

export default function TestImportPage() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cron/import'); // Requête vers l'API Next.js

                if (!response.ok) {
                    throw new Error(`Erreur: ${response.status}`);
                }

                const data = await response.json(); // Conversion de la réponse en JSON

                // Affichage dans la console du navigateur
                console.log("📦 Données reçues côté client :");
                console.log(data);

            } catch (error) {
                console.error("Erreur client :", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-xl font-bold mb-4">Test d'importation JSON</h1>
        </div>
    );
}
