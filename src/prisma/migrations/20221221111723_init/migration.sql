/*
  Warnings:

  - You are about to drop the column `location_name` on the `Egg_Collection` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `Egg_Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Egg_Collection" DROP COLUMN "location_name",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Egg_Collection" ADD CONSTRAINT "Egg_Collection_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
