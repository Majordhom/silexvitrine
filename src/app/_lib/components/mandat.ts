import { prisma } from "@/app/_lib/prisma";

export async function getMandatById(id: number) {
    return await prisma.mandat.findUnique({
        where: { id },
        include: { photos: true },
    });
}
