/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `private_id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_MyRelationTable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `userPrivate_id` on the `Cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userPrivate_id` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userPrivate_id` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_MyRelationTable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userPrivate_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userPrivate_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userPrivate_id_fkey";

-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_B_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "userPrivate_id",
ADD COLUMN     "userPrivate_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userPrivate_id",
ADD COLUMN     "userPrivate_id" INTEGER NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "userPrivate_id",
ADD COLUMN     "userPrivate_id" INTEGER NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "private_id",
ADD COLUMN     "private_id" SERIAL NOT NULL,
ALTER COLUMN "public_id" DROP DEFAULT,
ALTER COLUMN "public_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("private_id");
DROP SEQUENCE "User_public_id_seq";

-- AlterTable
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_MyRelationTable_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userPrivate_id_key" ON "Cart"("userPrivate_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_private_id_key" ON "User"("private_id");

-- CreateIndex
CREATE INDEX "_MyRelationTable_B_index" ON "_MyRelationTable"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userPrivate_id_fkey" FOREIGN KEY ("userPrivate_id") REFERENCES "User"("private_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userPrivate_id_fkey" FOREIGN KEY ("userPrivate_id") REFERENCES "User"("private_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userPrivate_id_fkey" FOREIGN KEY ("userPrivate_id") REFERENCES "User"("private_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MyRelationTable" ADD CONSTRAINT "_MyRelationTable_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
