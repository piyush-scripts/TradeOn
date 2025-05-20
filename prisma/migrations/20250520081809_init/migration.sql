/*
  Warnings:

  - Added the required column `itemId` to the `OrderbookHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderbookHistory" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holdings" (
    "userName" TEXT NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Holdings_pkey" PRIMARY KEY ("userName","itemId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Items_id_key" ON "Items"("id");

-- AddForeignKey
ALTER TABLE "OrderbookHistory" ADD CONSTRAINT "OrderbookHistory_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holdings" ADD CONSTRAINT "Holdings_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holdings" ADD CONSTRAINT "Holdings_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
