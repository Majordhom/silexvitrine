/*
  Warnings:

  - The primary key for the `Utilisateur` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Utilisateur` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `email` on the `Utilisateur` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `Utilisateur` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `nom` on the `Utilisateur` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `prenom` on the `Utilisateur` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "public"."Utilisateur" DROP CONSTRAINT "Utilisateur_pkey",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "telephone" VARCHAR(255),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "nom" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "prenom" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."BlogPost" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "readTime" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "blocks" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "public"."BlogPost"("slug");

-- CreateIndex
CREATE INDEX "Utilisateur_email_idx" ON "public"."Utilisateur"("email");
