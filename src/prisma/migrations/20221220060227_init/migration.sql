-- DropForeignKey
ALTER TABLE "Egg_Collection" DROP CONSTRAINT "Egg_Collection_approx_next_timeId_fkey";

-- AlterTable
ALTER TABLE "Egg_Collection" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "nest_width" DROP NOT NULL,
ALTER COLUMN "nest_depth" DROP NOT NULL,
ALTER COLUMN "distance_of_sea" DROP NOT NULL,
ALTER COLUMN "temperature" DROP NOT NULL,
ALTER COLUMN "approx_next_timeId" DROP NOT NULL,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Egg_Collection" ADD CONSTRAINT "Egg_Collection_approx_next_timeId_fkey" FOREIGN KEY ("approx_next_timeId") REFERENCES "Approx_Next_Time"("id") ON DELETE SET NULL ON UPDATE CASCADE;
