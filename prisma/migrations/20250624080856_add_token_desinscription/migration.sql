-- AlterTable
ALTER TABLE "Abonne" ADD COLUMN     "tokenDesinscription" TEXT,
ALTER COLUMN "token" DROP NOT NULL;
