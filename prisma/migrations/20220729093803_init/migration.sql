/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `OrderDetails` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productName]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "claimReward" BOOLEAN NOT NULL DEFAULT false,
    "coins" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("claimReward", "coins", "createdAt", "email", "id", "name", "password", "role") SELECT "claimReward", "coins", "createdAt", "email", "id", "name", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetails_id_key" ON "OrderDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");
