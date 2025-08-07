import { prisma } from '@/app/_lib/prisma';
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
        "reference", "type_offre_code", "type_offre", "corps", "prix", "charges", "foncier", "type_mandat",
        "type_bien", "type_bien_code", "surface_habitable", "nb_pieces", "chambres", "nb_etages",
        "etage", "sdb", "wc", "cuisine", "energie_chauffage", "format_chauffage", "parking",
        "piscine", "terrasse", "exposition", "annee_construction", "ascenseur", "balcon",
        "ville", "cp", "departement", "isNotAvailable", "statut", "meuble", "dateEnr",
        "dateMaj", "latitude", "longitude", "video_link", "urlBien", "publishedInWebSite",
        "publishedInApp", "visite_immediat", "bien_category", "chauffages"
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
            
            // Basic validation
            if (!item.reference || !item.mandat_numero || !item.type_bien || !item.ville) {
                console.log('Skipping invalid item:', item);
                continue;
            }

            const mandatData = {
                reference: item.reference,
                mandat_numero: item.mandat_numero,
                type_offre_code: item.type_offre_code || 'vente',
                type_offre: item.type_offre || 'vente',
                corps: item.corps || 'Description non disponible',
                prix: Number(item.prix) || 0,
                type_mandat: item.type_mandat || 'Simple',
                type_bien: item.type_bien,
                type_bien_code: item.type_bien_code || '',
                surface_habitable: Number(item.surface_habitable) || null,
                nb_pieces: Number(item.nb_pieces) || null,
                chambres: Number(item.chambres) || null,
                ville: item.ville,
                departement: item.departement || '13',
                isNotAvailable: item.isNotAvailable === "true",
                publishedInWebSite: item.publishedInWebSite !== "false"
            };

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