/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Mandat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Mandat" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Mandat_slug_key" ON "public"."Mandat"("slug");
