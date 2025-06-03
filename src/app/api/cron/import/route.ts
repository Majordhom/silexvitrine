import { NextResponse } from 'next/server'; // Importation de NextResponse pour gérer les réponses HTTP

export async function GET() { // Fonction asynchrone pour gérer la requête GET
    try {
        const externalApiUrl = 'https://crm.majordhom.fr/api/export/majordhom.json'; //

        // Fetch des données externes
        const response = await fetch(externalApiUrl, {
            cache: 'no-store' // Optionnel : désactive le cache
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const jsonData = await response.json(); // Conversion de la réponse en JSON

        // Affiche les données dans la console SERVEUR (terminal)
        console.log("Données récupérées côté serveur :");
        console.log(JSON.stringify(jsonData, null, 2)); // Affichage formaté des données

        return NextResponse.json(jsonData); // Retourne les données JSON en réponse à la requête GET

    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        return NextResponse.json(
            { error: "Échec de l'importation" },
            { status: 500 }
        );
    }
}
