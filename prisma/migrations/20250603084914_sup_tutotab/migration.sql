/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Mandat" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "type_offre_code" TEXT NOT NULL,
    "type_offre" TEXT NOT NULL,
    "corps" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "charges" INTEGER,
    "foncier" INTEGER,
    "type_mandat" TEXT NOT NULL,
    "type_bien" TEXT NOT NULL,
    "type_bien_code" TEXT NOT NULL,
    "surface_habitable" INTEGER,
    "nb_pieces" INTEGER,
    "chambres" INTEGER,
    "nb_etages" INTEGER,
    "etage" INTEGER,
    "sdb" INTEGER,
    "wc" INTEGER,
    "cuisine" INTEGER,
    "energie_chauffage" TEXT,
    "format_chauffage" TEXT,
    "parking" BOOLEAN,
    "piscine" BOOLEAN,
    "terrasse" BOOLEAN,
    "exposition" TEXT,
    "annee_construction" INTEGER,
    "ascenseur" BOOLEAN,
    "balcon" INTEGER,
    "ville" TEXT NOT NULL,
    "cp" TEXT NOT NULL,
    "departement" TEXT NOT NULL,
    "isNotAvailable" BOOLEAN,
    "statut" TEXT,
    "meuble" BOOLEAN,
    "dateEnr" TIMESTAMP(3),
    "dateMaj" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "video_link" TEXT,
    "urlBien" TEXT,
    "publishedInWebSite" BOOLEAN,
    "publishedInApp" BOOLEAN,
    "visite_immediat" BOOLEAN,
    "bien_category" TEXT,
    "chauffages" TEXT,

    CONSTRAINT "Mandat_pkey" PRIMARY KEY ("id")
);
