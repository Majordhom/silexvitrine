-- CreateTable
CREATE TABLE "Abonne" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statutActif" BOOLEAN NOT NULL DEFAULT true,
    "dateDesinscription" TIMESTAMP(3),
    "token" TEXT NOT NULL,

    CONSTRAINT "Abonne_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Abonne_email_key" ON "Abonne"("email");
