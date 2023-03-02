/*
  Warnings:

  - The values [pending,completed] on the enum `userStatusType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone_number` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "userStatusType_new" AS ENUM ('active', 'inActive');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "userStatusType_new" USING ("status"::text::"userStatusType_new");
ALTER TYPE "userStatusType" RENAME TO "userStatusType_old";
ALTER TYPE "userStatusType_new" RENAME TO "userStatusType";
DROP TYPE "userStatusType_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active',
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "roleId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
