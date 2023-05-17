/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Garage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Garage" DROP COLUMN "imageUrl",
ADD COLUMN     "images" TEXT[];
