-- CreateTable
CREATE TABLE "OTP" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "otp" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "OTP_otp_key" ON "OTP"("otp");
