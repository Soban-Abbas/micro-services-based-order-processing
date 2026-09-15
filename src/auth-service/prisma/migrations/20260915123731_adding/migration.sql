-- AlterTable
ALTER TABLE "refreshToken" ADD COLUMN     "deviceInfo" TEXT,
ADD COLUMN     "ipAdress" TEXT,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '7 days';
