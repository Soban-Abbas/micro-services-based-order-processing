-- AlterTable
ALTER TABLE "refreshToken" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '7 days';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL;
