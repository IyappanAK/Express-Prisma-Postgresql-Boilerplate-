/*
  Warnings:

  - You are about to drop the column `location_name` on the `Location` table. All the data in the column will be lost.
  - Added the required column `locationName` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "location_name",
ADD COLUMN     "locationName" TEXT NOT NULL;
