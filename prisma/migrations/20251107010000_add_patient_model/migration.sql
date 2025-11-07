-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 1: Create patients from existing appointment data (with unique constraint handling)
INSERT INTO "patients" ("id", "name", "email", "phone", "createdAt", "updatedAt", "userId")
SELECT 
    gen_random_uuid(),
    "name",
    "email",
    "phone",
    "createdAt",
    "updatedAt",
    "userId"
FROM "Appointment"
GROUP BY "email", "name", "phone", "createdAt", "updatedAt", "userId"
ON CONFLICT ("email") DO NOTHING;

-- Step 2: Add patientId column to Appointment (nullable first)
ALTER TABLE "Appointment" ADD COLUMN IF NOT EXISTS "patientId" TEXT;

-- Step 3: Update appointments with patientId from patients table
UPDATE "Appointment" 
SET "patientId" = (
    SELECT "id" FROM "patients" 
    WHERE "patients"."email" = "Appointment"."email" 
    AND "patients"."userId" = "Appointment"."userId"
    LIMIT 1
)
WHERE "patientId" IS NULL;

-- Step 4: Make patientId NOT NULL
ALTER TABLE "Appointment" ALTER COLUMN "patientId" SET NOT NULL;

-- Step 5: Add notes column to Appointment if not exists
ALTER TABLE "Appointment" ADD COLUMN IF NOT EXISTS "notes" TEXT;

-- Step 6: Drop old columns from Appointment
ALTER TABLE "Appointment" DROP COLUMN IF EXISTS "name";
ALTER TABLE "Appointment" DROP COLUMN IF EXISTS "email";
ALTER TABLE "Appointment" DROP COLUMN IF EXISTS "phone";

-- AddForeignKey
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'Appointment_patientId_fkey'
    ) THEN
        ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" 
        FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

