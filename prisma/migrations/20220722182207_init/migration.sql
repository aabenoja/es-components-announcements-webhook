/*
  Warnings:

  - Added the required column `isTeams` to the `Webhook` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Webhook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "isTeams" BOOLEAN NOT NULL
);
INSERT INTO "new_Webhook" ("id", "url") SELECT "id", "url" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
