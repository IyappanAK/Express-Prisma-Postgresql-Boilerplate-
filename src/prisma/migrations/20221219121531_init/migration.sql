-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('refresh', 'resetPassword', 'verifyEmail');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teamid_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "teamid" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "user" INTEGER NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMPTZ(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3),
    "deletedAt" TIMESTAMPTZ(3),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
