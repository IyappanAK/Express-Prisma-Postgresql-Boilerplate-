-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamid" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Egg_Collection" (
    "id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "nest_width" DOUBLE PRECISION NOT NULL,
    "nest_depth" DOUBLE PRECISION NOT NULL,
    "no_of_eggs" INTEGER NOT NULL,
    "distance_of_sea" DOUBLE PRECISION NOT NULL,
    "temperature" INTEGER NOT NULL,
    "approx_next_timeId" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Egg_Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Egg_Image" (
    "id" SERIAL NOT NULL,
    "eggCollectionId" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Egg_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Approx_Next_Time" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Approx_Next_Time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OTP" (
    "id" SERIAL NOT NULL,
    "phone_number" INTEGER NOT NULL,
    "otp" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,

    CONSTRAINT "OTP_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamid_fkey" FOREIGN KEY ("teamid") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Egg_Collection" ADD CONSTRAINT "Egg_Collection_approx_next_timeId_fkey" FOREIGN KEY ("approx_next_timeId") REFERENCES "Approx_Next_Time"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Egg_Collection" ADD CONSTRAINT "Egg_Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Egg_Image" ADD CONSTRAINT "Egg_Image_eggCollectionId_fkey" FOREIGN KEY ("eggCollectionId") REFERENCES "Egg_Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
