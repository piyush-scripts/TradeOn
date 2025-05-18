/*
  Warnings:

  - You are about to drop the column `isRevoked` on the `RefreshTokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `RefreshTokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "RefreshTokens" DROP COLUMN "isRevoked";

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_token_key" ON "RefreshTokens"("token");
