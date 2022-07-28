-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Webhook" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "isTeams" BOOLEAN NOT NULL,
    "failureCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Webhook" ("id", "isTeams", "url") SELECT "id", "isTeams", "url" FROM "Webhook";
DROP TABLE "Webhook";
ALTER TABLE "new_Webhook" RENAME TO "Webhook";
CREATE UNIQUE INDEX "Webhook_url_key" ON "Webhook"("url");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
