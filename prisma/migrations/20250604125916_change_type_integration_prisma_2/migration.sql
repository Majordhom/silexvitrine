/*
  Warnings:

  - The `cp` column on the `Mandat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Mandat" DROP COLUMN "cp",
ADD COLUMN     "cp" INTEGER;
