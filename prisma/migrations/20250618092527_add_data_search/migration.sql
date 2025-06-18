-- CreateTable
CREATE TABLE "DataSearch" (
    "id" SERIAL NOT NULL,
    "nb_pieces" INTEGER,
    "type_bien" TEXT,
    "prixMin" INTEGER,
    "prixMax" INTEGER,
    "secteur" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataSearch_pkey" PRIMARY KEY ("id")
);
