/*
  Warnings:

  - Added the required column `farmType` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainCrop` to the `Farm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FarmStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "farmStatus" "FarmStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "farmType" TEXT NOT NULL,
ADD COLUMN     "mainCrop" TEXT NOT NULL;
