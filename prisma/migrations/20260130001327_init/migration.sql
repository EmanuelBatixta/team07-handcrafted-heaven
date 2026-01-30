-- CreateTable
CREATE TABLE "User" (
    "private_id" TEXT NOT NULL,
    "public" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userPrivate_id" TEXT NOT NULL,
    "image_link" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userPrivate_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_private_id_key" ON "User"("private_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_public_key" ON "User"("public");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "Product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userPrivate_id_fkey" FOREIGN KEY ("userPrivate_id") REFERENCES "User"("private_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userPrivate_id_fkey" FOREIGN KEY ("userPrivate_id") REFERENCES "User"("private_id") ON DELETE RESTRICT ON UPDATE CASCADE;
