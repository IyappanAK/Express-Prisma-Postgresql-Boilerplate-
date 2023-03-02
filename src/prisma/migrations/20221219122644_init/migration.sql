-- CreateEnum
CREATE TYPE "userStatusType" AS ENUM ('pending', 'completed');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "userStatusType" NOT NULL DEFAULT 'pending';
