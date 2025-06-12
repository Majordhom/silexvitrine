-- CreateTable
CREATE TABLE "Mandat" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "type_offre_code" TEXT NOT NULL,
    "type_offre" TEXT NOT NULL,
    "corps" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "charges" TEXT,
    "foncier" INTEGER,
    "type_mandat" TEXT NOT NULL,
    "type_bien" TEXT NOT NULL,
    "type_bien_code" TEXT NOT NULL,
    "surface_habitable" INTEGER,
    "nb_pieces" INTEGER,
    "chambres" INTEGER,
    "nb_etages" INTEGER,
    "etage" INTEGER,
    "sdb" INTEGER,
    "wc" INTEGER,
    "cuisine" INTEGER,
    "energie_chauffage" TEXT,
    "format_chauffage" TEXT,
    "parking" INTEGER,
    "piscine" BOOLEAN,
    "terrasse" INTEGER,
    "exposition" TEXT,
    "annee_construction" INTEGER,
    "ascenseur" BOOLEAN,
    "balcon" INTEGER,
    "ville" TEXT NOT NULL,
    "cp" INTEGER,
    "departement" TEXT NOT NULL,
    "isNotAvailable" BOOLEAN,
    "statut" TEXT,
    "meuble" BOOLEAN,
    "dateEnr" TIMESTAMP(3),
    "dateMaj" TIMESTAMP(3),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "video_link" TEXT,
    "urlBien" TEXT,
    "publishedInWebSite" BOOLEAN,
    "publishedInApp" BOOLEAN,
    "visite_immediat" BOOLEAN,
    "bien_category" TEXT,
    "chauffages" TEXT,

    CONSTRAINT "Mandat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MandatPhoto" (
    "id" SERIAL NOT NULL,
    "mandatId" INTEGER NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "src" VARCHAR(255) NOT NULL DEFAULT '',
    "position" INTEGER,

    CONSTRAINT "MandatPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "authToken" VARCHAR(255),
    "tokenCreatedAt" TIMESTAMP(3),
    "isSubscribed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SearchQuery" (
    "id" TEXT NOT NULL,
    "sessionId" VARCHAR(255),
    "email" VARCHAR(255),
    "criteria" JSONB NOT NULL,
    "userAgent" TEXT,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SearchQuery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mandat_reference_key" ON "Mandat"("reference");

-- CreateIndex
CREATE INDEX "MandatPhoto_mandatId_idx" ON "MandatPhoto"("mandatId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "SearchQuery_sessionId_idx" ON "SearchQuery"("sessionId");

-- CreateIndex
CREATE INDEX "SearchQuery_email_idx" ON "SearchQuery"("email");

-- AddForeignKey
ALTER TABLE "MandatPhoto" ADD CONSTRAINT "MandatPhoto_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "Mandat"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
