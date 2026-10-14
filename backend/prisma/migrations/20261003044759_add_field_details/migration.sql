/*
  Warnings:

  - You are about to drop the column `latitude` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Field` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Field" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "irrigationType" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "plantingDate" TIMESTAMP(3);
