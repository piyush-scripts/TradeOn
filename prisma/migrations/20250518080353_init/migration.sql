/*
  Warnings:

  - You are about to drop the column `userId` on the `RefreshTokens` table. All the data in the column will be lost.
  - Added the required column `userName` to the `RefreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RefreshTokens" DROP CONSTRAINT "RefreshTokens_userId_fkey";

-- AlterTable
ALTER TABLE "RefreshTokens" DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RefreshTokens" ADD CONSTRAINT "RefreshTokens_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("name") ON DELETE CASCADE ON UPDATE CASCADE;
