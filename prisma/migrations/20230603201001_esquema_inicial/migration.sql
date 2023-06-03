-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "contactNumber" INTEGER,
    "contactEmail" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSitter" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PetSitter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "petSitterId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "race" TEXT,
    "bithdate" TIMESTAMP(3) NOT NULL,
    "medication" BOOLEAN NOT NULL,
    "addicionalInformation" TEXT,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "details" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "dogId" INTEGER NOT NULL,
    "petSitterId" INTEGER NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_petSitterId_fkey" FOREIGN KEY ("petSitterId") REFERENCES "PetSitter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_petSitterId_fkey" FOREIGN KEY ("petSitterId") REFERENCES "PetSitter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
