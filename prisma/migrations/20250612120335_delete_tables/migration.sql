/*
  Warnings:

  - You are about to drop the `Mandat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MandatPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SearchQuery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MandatPhoto" DROP CONSTRAINT "MandatPhoto_mandatId_fkey";

-- DropTable
DROP TABLE "Mandat";

-- DropTable
DROP TABLE "MandatPhoto";

-- DropTable
DROP TABLE "SearchQuery";

-- DropTable
DROP TABLE "User";
