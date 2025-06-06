/*
  Warnings:

  - Made the column `mandatId` on table `MandatPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MandatPhoto" ALTER COLUMN "mandatId" SET NOT NULL;
