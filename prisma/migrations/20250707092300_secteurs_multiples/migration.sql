/*
  Warnings:

  - The `secteur` column on the `DataSearch` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "DataSearch" DROP COLUMN "secteur",
ADD COLUMN     "secteur" TEXT[];
