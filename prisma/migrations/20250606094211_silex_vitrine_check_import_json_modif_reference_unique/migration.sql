/*
  Warnings:

  - A unique constraint covering the columns `[reference]` on the table `Mandat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Mandat_reference_key" ON "Mandat"("reference");
