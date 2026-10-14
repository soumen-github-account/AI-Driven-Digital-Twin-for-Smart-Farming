-- CreateEnum
CREATE TYPE "DigitalTwinStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "DigitalTwin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "geometryType" TEXT NOT NULL,
    "coordinateSystem" TEXT,
    "geometryJson" JSONB NOT NULL,
    "gpsCoordinates" JSONB,
    "localCoordinates" JSONB,
    "area" DOUBLE PRECISION,
    "areaUnit" TEXT NOT NULL DEFAULT 'sqm',
    "perimeter" DOUBLE PRECISION,
    "crop" TEXT,
    "season" TEXT,
    "notes" TEXT,
    "status" "DigitalTwinStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DigitalTwin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DigitalTwin_fieldId_key" ON "DigitalTwin"("fieldId");

-- CreateIndex
CREATE INDEX "DigitalTwin_userId_idx" ON "DigitalTwin"("userId");

-- CreateIndex
CREATE INDEX "DigitalTwin_farmId_idx" ON "DigitalTwin"("farmId");

-- CreateIndex
CREATE INDEX "DigitalTwin_status_idx" ON "DigitalTwin"("status");

-- AddForeignKey
ALTER TABLE "DigitalTwin" ADD CONSTRAINT "DigitalTwin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalTwin" ADD CONSTRAINT "DigitalTwin_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalTwin" ADD CONSTRAINT "DigitalTwin_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE CASCADE ON UPDATE CASCADE;
