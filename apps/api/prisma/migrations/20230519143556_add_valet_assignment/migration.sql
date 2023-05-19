/*
  Warnings:

  - You are about to drop the column `checkInValetId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutValetId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_checkInValetId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_checkOutValetId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "checkInValetId",
DROP COLUMN "checkOutValetId";

-- CreateTable
CREATE TABLE "ValetAssignment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pickupValetId" TEXT,
    "returnValetId" TEXT,
    "pickupLat" DOUBLE PRECISION NOT NULL,
    "pickupLng" DOUBLE PRECISION NOT NULL,
    "returnLat" DOUBLE PRECISION NOT NULL,
    "returnLng" DOUBLE PRECISION NOT NULL,
    "bookingId" INTEGER,

    CONSTRAINT "ValetAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValetAssignment_bookingId_key" ON "ValetAssignment"("bookingId");

-- AddForeignKey
ALTER TABLE "ValetAssignment" ADD CONSTRAINT "ValetAssignment_pickupValetId_fkey" FOREIGN KEY ("pickupValetId") REFERENCES "Valet"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValetAssignment" ADD CONSTRAINT "ValetAssignment_returnValetId_fkey" FOREIGN KEY ("returnValetId") REFERENCES "Valet"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValetAssignment" ADD CONSTRAINT "ValetAssignment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
