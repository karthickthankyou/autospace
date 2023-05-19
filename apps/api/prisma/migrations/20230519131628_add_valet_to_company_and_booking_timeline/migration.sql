/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Valet` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BookingTimeline" ADD COLUMN     "valetId" TEXT;

-- AlterTable
ALTER TABLE "Valet" ADD COLUMN     "companyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Valet_companyId_key" ON "Valet"("companyId");

-- AddForeignKey
ALTER TABLE "Valet" ADD CONSTRAINT "Valet_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingTimeline" ADD CONSTRAINT "BookingTimeline_valetId_fkey" FOREIGN KEY ("valetId") REFERENCES "Valet"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
