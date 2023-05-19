-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('SELF_PARK', 'VALET');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BookingStatus" ADD VALUE 'VALET_ASSIGNED_FOR_CHECK_IN';
ALTER TYPE "BookingStatus" ADD VALUE 'VALET_PICKED_UP';
ALTER TYPE "BookingStatus" ADD VALUE 'VALET_ASSIGNED_FOR_CHECK_OUT';
ALTER TYPE "BookingStatus" ADD VALUE 'VALET_RETURNED';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "checkInValetId" TEXT,
ADD COLUMN     "checkOutValetId" TEXT,
ADD COLUMN     "type" "BookingType" NOT NULL DEFAULT 'SELF_PARK';

-- CreateTable
CREATE TABLE "Valet" (
    "uid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "Valet_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_checkInValetId_fkey" FOREIGN KEY ("checkInValetId") REFERENCES "Valet"("uid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_checkOutValetId_fkey" FOREIGN KEY ("checkOutValetId") REFERENCES "Valet"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
