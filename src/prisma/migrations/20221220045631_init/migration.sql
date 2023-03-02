/*
  Warnings:

  - You are about to drop the column `teamid` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "eggCollection" AS ENUM ('pending', 'completed');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamid_fkey";

-- AlterTable
ALTER TABLE "Egg_Collection" ADD COLUMN     "status" "eggCollection" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "teamid",
ADD COLUMN     "teamId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
