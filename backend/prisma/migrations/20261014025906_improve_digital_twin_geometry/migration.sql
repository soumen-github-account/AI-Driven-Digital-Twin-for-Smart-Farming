/*
  Warnings:

  - Made the column `coordinateSystem` on table `DigitalTwin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "DigitalTwin" ALTER COLUMN "coordinateSystem" SET NOT NULL,
ALTER COLUMN "coordinateSystem" SET DEFAULT 'local-meter';
