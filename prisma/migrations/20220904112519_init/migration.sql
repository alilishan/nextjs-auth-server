/*
  Warnings:

  - Added the required column `updatedAt` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OTP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_OTP" ("createdAt", "email", "id", "otp", "used") SELECT "createdAt", "email", "id", "otp", "used" FROM "OTP";
DROP TABLE "OTP";
ALTER TABLE "new_OTP" RENAME TO "OTP";
CREATE UNIQUE INDEX "OTP_otp_key" ON "OTP"("otp");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
