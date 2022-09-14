-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OTP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "otp" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_OTP" ("email", "id", "otp", "used") SELECT "email", "id", "otp", "used" FROM "OTP";
DROP TABLE "OTP";
ALTER TABLE "new_OTP" RENAME TO "OTP";
CREATE UNIQUE INDEX "OTP_otp_key" ON "OTP"("otp");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
