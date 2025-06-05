import { prisma } from '@/app/_lib/prisma';
import { z } from "zod";

export async function insertMandatPhoto(data: any[]) {
    let currentItem;
    try {
        for (const item of data) {
            currentItem = item;

            // Valider les données
            const mandatPhotoData = z.object({
                mandatId: z.coerce.number(),
                filename: z.coerce.string(),
                src: z.string().optional().default('photo'),
                position: z.coerce.number().optional().default(0),
            }).parse(item);

            // Extraire mandatId et insérer les données
            const { mandatId, ...rest } = mandatPhotoData;
            await prisma.mandatPhoto.create({
                data: mandatPhotoData,
            });
        }
    } catch (error) {
        console.error('Error inserting mandat photo:', error, 'Current item:', currentItem);
        throw error;
    }
}