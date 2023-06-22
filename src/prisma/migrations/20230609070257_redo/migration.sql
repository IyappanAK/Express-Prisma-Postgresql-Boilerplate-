/*
  Warnings:

  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `Menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `meal_type` on the `Menu` table. All the data in the column will be lost.
  - The primary key for the `Notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `comment` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Notification` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `assingnedTo` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Restaurent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Restaurent` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Review` table. All the data in the column will be lost.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `Role` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `User` table. All the data in the column will be lost.
  - The primary key for the `cart_menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `cart_menu` table. All the data in the column will be lost.
  - The primary key for the `menuCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ID` on the `menuCategory` table. All the data in the column will be lost.
  - You are about to drop the column `menu_category` on the `menuCategory` table. All the data in the column will be lost.
  - Added the required column `area` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `house_no` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `isAvailable` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageHead` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rider_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rider_name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Restaurent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewTitle` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review_description` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `menuCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_category_name` to the `menuCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_Restaurent_id_fkey";

-- DropForeignKey
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_cart_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurent" DROP CONSTRAINT "Restaurent_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_order_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropForeignKey
ALTER TABLE "cart_menu" DROP CONSTRAINT "cart_menu_menu_id_fkey";

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "ID",
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "street_address" SET DATA TYPE TEXT,
DROP COLUMN "house_no",
ADD COLUMN     "house_no" INTEGER NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Menu" DROP CONSTRAINT "Menu_pkey",
DROP COLUMN "ID",
DROP COLUMN "meal_type",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL,
ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_pkey",
DROP COLUMN "ID",
DROP COLUMN "comment",
DROP COLUMN "message",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "messageHead" TEXT NOT NULL,
ADD CONSTRAINT "Notification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "ID",
DROP COLUMN "assingnedTo",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "rider_id" TEXT NOT NULL,
ADD COLUMN     "rider_name" TEXT NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Restaurent" DROP CONSTRAINT "Restaurent_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Restaurent_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "reviewTitle" TEXT NOT NULL,
ADD COLUMN     "review_description" TEXT NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart_menu" DROP CONSTRAINT "cart_menu_pkey",
DROP COLUMN "ID",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "cart_menu_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "menuCategory" DROP CONSTRAINT "menuCategory_pkey",
DROP COLUMN "ID",
DROP COLUMN "menu_category",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL,
ADD COLUMN     "menu_category_name" TEXT NOT NULL,
ADD CONSTRAINT "menuCategory_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "menuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_Restaurent_id_fkey" FOREIGN KEY ("Restaurent_id") REFERENCES "Restaurent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cart_menu_id_fkey" FOREIGN KEY ("cart_menu_id") REFERENCES "cart_menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurent" ADD CONSTRAINT "Restaurent_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_menu" ADD CONSTRAINT "cart_menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
