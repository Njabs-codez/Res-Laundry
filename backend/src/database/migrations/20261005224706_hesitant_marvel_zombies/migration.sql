CREATE TYPE "role" AS ENUM('resident', 'coordinator', 'EC', 'dev');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'resident'::"role" NOT NULL;