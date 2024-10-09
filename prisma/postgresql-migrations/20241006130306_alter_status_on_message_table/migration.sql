ALTER TABLE "Message"
ALTER COLUMN "status"
TYPE VARCHAR(30);

-- AlterTable
UPDATE "Message" SET "status" = 'PENDING';
