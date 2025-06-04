/*
  Warnings:

  - The `parking` column on the `Mandat` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `terrasse` column on the `Mandat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Mandat" DROP COLUMN "parking",
ADD COLUMN     "parking" INTEGER,
DROP COLUMN "terrasse",
ADD COLUMN     "terrasse" INTEGER;
