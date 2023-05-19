/*
  Warnings:

  - The primary key for the `ValetAssignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ValetAssignment` table. All the data in the column will be lost.
  - Made the column `bookingId` on table `ValetAssignment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ValetAssignment" DROP CONSTRAINT "ValetAssignment_bookingId_fkey";

-- DropIndex
DROP INDEX "ValetAssignment_bookingId_key";

-- AlterTable
ALTER TABLE "ValetAssignment" DROP CONSTRAINT "ValetAssignment_pkey",
DROP COLUMN "id",
ALTER COLUMN "bookingId" SET NOT NULL,
ADD CONSTRAINT "ValetAssignment_pkey" PRIMARY KEY ("bookingId");

-- AddForeignKey
ALTER TABLE "ValetAssignment" ADD CONSTRAINT "ValetAssignment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
