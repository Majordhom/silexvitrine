import { prisma } from '@/app/_lib/prisma';
import { z } from "zod";
import { insertMandatPhoto } from './importMandatPhoto';

// Récupère toutes les références de mandats existants
export async function getExistingMandatReferences() {
    const mandats = await prisma.mandat.findMany({
        select: { reference: true }
    });
    return mandats.map(m => m.reference);
}

// Récupère toutes les photos existantes groupées par mandatId
export async function getExistingMandatPhotos() {
    const photos = await prisma.mandatPhoto.findMany({
        select: { id: true, mandatId: true, filename: true }
    });
    const grouped = photos.reduce((acc, photo) => {
        if (!acc[photo.mandatId]) acc[photo.mandatId] = [];
        acc[photo.mandatId].push(photo);
        return acc;
    }, {} as Record<number, typeof photos>);
    return grouped;
}

// Compare deux objets mandat
function isMandatDifferent(dbMandat: any, importMandat: any) {
    const fields = [
        "reference", "typeOffreCode", "typeOffre", "corps", "prix", "charges", "foncier", "typeMandat",
        "typeBien", "typeBienCode", "surfaceHabitable", "nbPieces", "chambres", "nbEtages",
        "etage", "sdb", "wc", "cuisine", "energieChauffage", "formatChauffage", "parking",
        "piscine", "terrasse", "exposition", "anneeConstruction", "ascenseur", "balcon",
        "ville", "cp", "departement", "isNotAvailable", "statut", "meuble", "dateEnr",
        "dateMaj", "latitude", "longitude", "videoLink", "urlBien", "publishedInWebSite",
        "publishedInApp", "visiteImmediat", "bienCategory", "chauffages"
    ];
    return fields.some(field => dbMandat[field] !== importMandat[field]);
}

// Synchronise les photos d’un mandat : ajout, suppression, update
async function syncMandatPhotos(mandatId: number, importPhotos: any[]) {
    const dbPhotos = await prisma.mandatPhoto.findMany({
        where: { mandatId }
    });

    const dbPhotosByFilename = Object.fromEntries(dbPhotos.map(p => [p.filename, p]));
    const importPhotosByFilename = Object.fromEntries(importPhotos.map(p => [p.filename, p]));

    // Ajout ou mise à jour
    for (const photo of importPhotos) {
        if (!dbPhotosByFilename[photo.filename]) {
            await prisma.mandatPhoto.create({ data: { ...photo, mandatId } });
        } else {
            const dbPhoto = dbPhotosByFilename[photo.filename];
            if (dbPhoto.src !== photo.src || dbPhoto.position !== photo.position) {
                await prisma.mandatPhoto.update({
                    where: { id: dbPhoto.id },
                    data: { src: photo.src, position: photo.position }
                });
            }
        }
    }

    // Suppression des photos obsolètes
    for (const dbPhoto of dbPhotos) {
        if (!importPhotosByFilename[dbPhoto.filename]) {
            await prisma.mandatPhoto.delete({ where: { id: dbPhoto.id } });
        }
    }
}

export async function insertMandats(data: any[]) {
    let currentItem;
    try {
        // Récupération des mandats existants AVANT import
        const existingMandatRefs = await getExistingMandatReferences();

        for (const item of data) {
            currentItem = item;
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

            // Vérifie si le mandat existe déjà
            const dbMandat = await prisma.mandat.findUnique({
                where: { reference: mandatData.reference }
            });

            if (!dbMandat) {
                // Nouveau mandat : insertion
                const createdMandat = await prisma.mandat.create({ data: mandatData });

                // Ajout des photos associées
                if (Array.isArray(item.images?.image)) {
                    const photosData = item.images.image.map((url: string, idx: number) => ({
                        mandatId: createdMandat.id,
                        filename: url.substring(url.lastIndexOf('/') + 1),
                        src: url,
                        position: idx,
                    }));
                    await insertMandatPhoto(photosData);
                }
            } else {
                // Mandat existant : comparaison et update si besoin
                if (isMandatDifferent(dbMandat, mandatData)) {
                    await prisma.mandat.update({
                        where: { id: dbMandat.id },
                        data: mandatData,
                    });
                }
                // Synchronisation des photos
                if (Array.isArray(item.images?.image)) {
                    const photosData = item.images.image.map((url: string, idx: number) => ({
                        filename: url.substring(url.lastIndexOf('/') + 1),
                        src: url,
                        position: idx,
                    }));
                    await syncMandatPhotos(dbMandat.id, photosData);
                }
            }
        }

        // Suppression des mandats obsolètes
        const importedRefs = data.map(item => item.reference); // Récupérer les réf de mandats importés

        const refsToDelete = existingMandatRefs.filter(ref => !importedRefs.includes(ref)); // Réf des mandats à supprimer

        // Supprimer les mandats et photos associées
        for (const ref of refsToDelete) {
            const mandat = await prisma.mandat.findUnique({ where: { reference: ref } });
            if (mandat) {
                await prisma.mandatPhoto.deleteMany({ where: { mandatId: mandat.id } }); // Supprimer les photos associées
                await prisma.mandat.delete({ where: { id: mandat.id } }); // Supprimer le mandat
            }
        }

    } catch (error) {
        console.log(currentItem);
        console.error("Erreur lors de l'insertion :", error);
    }
    console.log("Insertion et synchronisation terminées !");
}