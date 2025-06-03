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
    "typeOffreCode" TEXT NOT NULL,
    "typeOffre" TEXT NOT NULL,
    "corps" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "charges" INTEGER,
    "foncier" INTEGER,
    "typeMandat" TEXT NOT NULL,
    "typeBien" TEXT NOT NULL,
    "typeBienCode" TEXT NOT NULL,
    "surfaceHabitable" INTEGER,
    "nbPieces" INTEGER,
    "chambres" INTEGER,
    "nbEtages" INTEGER,
    "etage" INTEGER,
    "sdb" INTEGER,
    "wc" INTEGER,
    "cuisine" INTEGER,
    "energieChauffage" TEXT,
    "formatChauffage" TEXT,
    "parking" BOOLEAN,
    "piscine" BOOLEAN,
    "terrasse" BOOLEAN,
    "exposition" TEXT,
    "anneeConstruction" INTEGER,
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
    "videoLink" TEXT,
    "urlBien" TEXT,
    "publishedInWebSite" BOOLEAN,
    "publishedInApp" BOOLEAN,
    "visiteImmediat" BOOLEAN,
    "bienCategory" TEXT,
    "chauffages" TEXT,

    CONSTRAINT "Mandat_pkey" PRIMARY KEY ("id")
);
