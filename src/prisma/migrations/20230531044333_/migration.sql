-- CreateTable
CREATE TABLE "Address" (
    "ID" SERIAL NOT NULL,
    "address_type" TEXT NOT NULL,
    "street_address" INTEGER NOT NULL,
    "house_no" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "landmark" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "User" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Menu" (
    "ID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "meal_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "Restaurent_id" INTEGER NOT NULL,
    "gstPercentage" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "ID" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "comment" TEXT,
    "menu_id" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Order" (
    "ID" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cart_menu_id" INTEGER NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "Bill" JSONB,
    "assingnedTo" TEXT,
    "menu_id" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "menuCategory" (
    "ID" SERIAL NOT NULL,
    "menu_category" TEXT NOT NULL,

    CONSTRAINT "menuCategory_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Restaurent" (
    "ID" SERIAL NOT NULL,
    "address_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Restaurent_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Review" (
    "ID" SERIAL NOT NULL,
    "ReviewType" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "cart_menu" (
    "ID" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "count" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cart_menu_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "Role" (
    "ID" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "rolePrivilege" JSONB,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "menuCategory"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_Restaurent_id_fkey" FOREIGN KEY ("Restaurent_id") REFERENCES "Restaurent"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_cart_menu_id_fkey" FOREIGN KEY ("cart_menu_id") REFERENCES "cart_menu"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurent" ADD CONSTRAINT "Restaurent_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_menu" ADD CONSTRAINT "cart_menu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "Menu"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
