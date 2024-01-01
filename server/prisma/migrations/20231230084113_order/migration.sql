-- AlterTable
ALTER TABLE "User" ADD COLUMN     "orders" INTEGER[];

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "cart" INTEGER[],
    "cost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
