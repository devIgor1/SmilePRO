-- AlterTable
ALTER TABLE "User" ADD COLUMN     "timeslots" TEXT[] DEFAULT ARRAY[]::TEXT[];
