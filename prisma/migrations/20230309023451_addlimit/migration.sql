/*
  Warnings:

  - Added the required column `limit` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "limit" INTEGER NOT NULL;
