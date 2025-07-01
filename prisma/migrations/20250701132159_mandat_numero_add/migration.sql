/*
  Warnings:

  - A unique constraint covering the columns `[mandat_numero]` on the table `Mandat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mandat_numero` to the `Mandat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mandat" ADD COLUMN     "mandat_numero" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mandat_mandat_numero_key" ON "Mandat"("mandat_numero");
