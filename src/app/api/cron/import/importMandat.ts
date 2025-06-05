import { prisma } from '@/app/_lib/prisma';
import { z } from "zod";
import { insertMandatPhoto } from './importMandatPhoto';
export async function insertMandats(data: any[]) {
    let currentItem;
    try {

    for (const item of data) {
        currentItem = item
            const mandatData = z.object({
                reference: z.string(),
                typeOffreCode: z.string().optional().default('vente'),
                typeOffre: z.string().optional().default('vente'),
                corps: z.string(),
                prix: z.coerce.number().min(0),
                charges: z.coerce.string().nullable(),
                foncier: z.coerce.number().nullable(),
                typeMandat: z.string().optional().default('basique'),
                typeBien: z.string().optional().default(''),
                typeBienCode: z.string().optional().default(''),
                surfaceHabitable: z.coerce.number().nullable().optional(),
                nbPieces: z.coerce.number().nullable().optional(),
                chambres: z.coerce.number().nullable(),
                nbEtages: z.coerce.number().nullable().optional(),
                etage: z.coerce.number().nullable(),
                sdb: z.coerce.number().nullable(),
                wc: z.coerce.number().nullable(),
                cuisine: z.number().nullable().optional(),
                energieChauffage: z.string().nullable().optional(),
                formatChauffage: z.string().nullable().optional(),
                parking: z.coerce.number().optional(),
                piscine: z.coerce.boolean().optional(),
                terrasse: z.coerce.number().optional(),
                exposition: z.string().nullable(),
                anneeConstruction: z.coerce.number().nullable().optional(),
                ascenseur: z.boolean().nullable(),
                balcon: z.number().nullable().optional(),
                ville: z.coerce.string(),
                cp: z.coerce.number().optional(),
                departement: z.string(),
                isNotAvailable: z.coerce.boolean().optional(),
                statut: z.string().nullable(),
                meuble: z.boolean().nullable(),
                dateEnr: z.coerce.date().optional(),
                dateMaj: z.coerce.date().optional(),
                latitude: z.coerce.number().nullable(),
                longitude: z.coerce.number().nullable(),
                videoLink: z.string().nullable().optional(),
                urlBien: z.string().nullable(),
                publishedInWebSite: z.coerce.boolean().optional(),
                publishedInApp: z.coerce.boolean().optional(),
                visiteImmediat: z.boolean().optional(),
                bienCategory: z.string().nullable().optional(),
                chauffages: z.string().nullable(),
            }).parse(item);

            const mandat = await prisma.mandat.create({
                data: mandatData,
            });
        // check si images présentes : les insérer dans MandatPhoto
        if (Array.isArray(item.images.image)) {
            const photosData = item.images.image.map((url: string, idx: number) => {
                console.log('Contenu de img :', url);
                return {
                    mandatId: mandat.id,
                    filename: url.substring(url.lastIndexOf('/') + 1),
                    src: url,
                    position: idx,
                };
            });
            await insertMandatPhoto(photosData);
        }
    }} catch (error) {
        console.log(currentItem)
        console.error("Erreur lors de l'insertion :", error);
    }
    console.log("Insertion réussie !");
}