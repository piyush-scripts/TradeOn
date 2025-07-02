/*
  Warnings:

  - Added the required column `itemSupporting` to the `Holdings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holdings" ADD COLUMN     "itemSupporting" TEXT NOT NULL;
