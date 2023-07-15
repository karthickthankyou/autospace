/*
  Warnings:

  - A unique constraint covering the columns `[companyId,uid]` on the table `Valet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Valet_companyId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Valet_companyId_uid_key" ON "Valet"("companyId", "uid");
