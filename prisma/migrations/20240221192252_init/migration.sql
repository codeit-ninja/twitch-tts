/*
  Warnings:

  - Added the required column `name` to the `Triggers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Triggers" ADD COLUMN     "name" TEXT NOT NULL;
