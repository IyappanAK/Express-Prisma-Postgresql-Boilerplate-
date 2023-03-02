/*
  Warnings:

  - Made the column `nest_depth` on table `Egg_Collection` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance_of_sea` on table `Egg_Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Egg_Collection" ALTER COLUMN "nest_depth" SET NOT NULL,
ALTER COLUMN "no_of_eggs" DROP NOT NULL,
ALTER COLUMN "distance_of_sea" SET NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);
