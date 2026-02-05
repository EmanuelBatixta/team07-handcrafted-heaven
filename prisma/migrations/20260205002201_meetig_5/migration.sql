/*
  Warnings:

  - You are about to drop the column `userPrivate_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `userPrivate_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MyRelationTable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPublic_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPublic_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userPrivate_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userPrivate_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userPrivate_id_fkey";

-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_MyRelationTable" DROP CONSTRAINT "_MyRelationTable_B_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userPrivate_id",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "userPublic_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userPrivate_id",
ADD COLUMN     "userPublic_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "_MyRelationTable";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userPublic_id_fkey" FOREIGN KEY ("userPublic_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userPublic_id_fkey" FOREIGN KEY ("userPublic_id") REFERENCES "User"("public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
