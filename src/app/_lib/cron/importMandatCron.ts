import cron from "node-cron";
import { insertMandats } from "@/app/api/cron/import/importMandat";

const externalApiUrl = "https://crm.majordhom.fr/api/export/majordhom.json";
let isRunning = false;

async function importMandatsJob() {
    if (isRunning) {
        console.warn("Import déjà en cours, tâche ignorée.");
        return;
    }
    isRunning = true;
    try {
        const response = await fetch(externalApiUrl, { cache: "no-store" });
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const jsonData = await response.json();
        await insertMandats(jsonData);
        console.log("Importation automatique réussie !");
    } catch (error) {
        console.error("Erreur lors de l'importation automatique :", error);
    } finally {
        isRunning = false;
    }
}

cron.schedule("0 * * * *", importMandatsJob, {
    timezone: "Europe/Paris",
});

importMandatsJob();