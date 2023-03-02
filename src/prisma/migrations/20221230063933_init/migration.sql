-- DropForeignKey
ALTER TABLE "Egg_Collection" DROP CONSTRAINT "Egg_Collection_hatchery_id_fkey";

-- AlterTable
ALTER TABLE "Egg_Collection" ALTER COLUMN "hatchery_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Egg_Collection" ADD CONSTRAINT "Egg_Collection_hatchery_id_fkey" FOREIGN KEY ("hatchery_id") REFERENCES "Hatchery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
