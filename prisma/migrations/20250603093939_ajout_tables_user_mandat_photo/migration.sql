-- CreateTable
CREATE TABLE "MandatPhoto" (
    "id" SERIAL NOT NULL,
    "mandatId" INTEGER,
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

-- CreateIndex
CREATE INDEX "MandatPhoto_mandatId_idx" ON "MandatPhoto"("mandatId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "MandatPhoto" ADD CONSTRAINT "MandatPhoto_mandatId_fkey" FOREIGN KEY ("mandatId") REFERENCES "Mandat"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
