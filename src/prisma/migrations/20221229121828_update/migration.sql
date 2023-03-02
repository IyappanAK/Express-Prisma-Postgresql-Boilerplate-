/*
  Warnings:

  - Added the required column `hatchery_id` to the `Egg_Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Egg_Collection" ADD COLUMN     "hatchery_id" INTEGER NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "incharge_name" TEXT,
ADD COLUMN     "nest_there" INTEGER,
ADD COLUMN     "pit_number" INTEGER,
ALTER COLUMN "temperature" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Hatchery" (
    "id" SERIAL NOT NULL,
    "hatchery_name" TEXT NOT NULL,

    CONSTRAINT "Hatchery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Egg_Collection" ADD CONSTRAINT "Egg_Collection_hatchery_id_fkey" FOREIGN KEY ("hatchery_id") REFERENCES "Hatchery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
