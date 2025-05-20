-- CreateTable
CREATE TABLE "OrderbookHistory" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderbookHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderbookHistory" ADD CONSTRAINT "OrderbookHistory_userName_fkey" FOREIGN KEY ("userName") REFERENCES "Users"("name") ON DELETE CASCADE ON UPDATE CASCADE;
