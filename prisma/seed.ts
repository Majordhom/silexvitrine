import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test property
  await prisma.mandat.create({
    data: {
      reference: "TEST001",
      type_offre_code: "VENTE",
      type_offre: "Vente",
      corps: "Magnifique appartement en plein cœur de Marseille",
      prix: 250000,
      type_mandat: "Simple",
      type_bien: "Appartement",
      type_bien_code: "APPT",
      surface_habitable: 75,
      nb_pieces: 3,
      chambres: 2,
      ville: "Marseille",
      departement: "13",
      isNotAvailable: false,
      publishedInWebSite: true,
      mandat_numero: "TEST001",
      slug: "appartement-marseille-test001",
      photos: {
        create: [
          {
            filename: "photo1.jpg",
            src: "/placeholder.jpg",
            position: 1
          }
        ]
      }
    }
  });

  console.log('Database has been seeded with test data');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
