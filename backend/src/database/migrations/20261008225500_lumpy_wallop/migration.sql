CREATE TYPE "machine_status" AS ENUM('healthy', 'unhealthy');--> statement-breakpoint
CREATE TYPE "machine_type" AS ENUM('washing machine', 'dryer');--> statement-breakpoint
CREATE TYPE "role" AS ENUM('resident', 'coordinator', 'EC', 'dev');--> statement-breakpoint
CREATE TABLE "machines" (
	"number" integer,
	"type" "machine_type" DEFAULT 'washing machine'::"machine_type",
	"status" "machine_status" DEFAULT 'healthy'::"machine_status" NOT NULL,
	CONSTRAINT "machines_pkey" PRIMARY KEY("number","type")
);
--> statement-breakpoint
CREATE TABLE "machine_usages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_number" varchar NOT NULL,
	"machine_number" integer NOT NULL,
	"machine_type" "machine_type" NOT NULL,
	"time_in" timestamp DEFAULT now() NOT NULL,
	"time_out" timestamp,
	"duration" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"student_number" varchar(9) PRIMARY KEY,
	"first_name" varchar(255) DEFAULT 'College' NOT NULL,
	"last_name" varchar(255) DEFAULT 'Man' NOT NULL,
	"role" "role" DEFAULT 'resident'::"role" NOT NULL,
	"password" varchar DEFAULT 'not assigned' NOT NULL,
	"room_number" varchar(7) DEFAULT 'not assigned' NOT NULL,
	"cellphone_number" varchar(10) DEFAULT 'not assigned' NOT NULL,
	"refresh_token" varchar(255),
	"reset_password_token" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "machine_usages" ADD CONSTRAINT "machine_usages_HliJ8LVfXJbh_fkey" FOREIGN KEY ("machine_number","machine_type") REFERENCES "machines"("number","type") ON DELETE RESTRICT;--> statement-breakpoint
ALTER TABLE "machine_usages" ADD CONSTRAINT "machine_usages_student_number_users_student_number_fkey" FOREIGN KEY ("student_number") REFERENCES "users"("student_number") ON DELETE CASCADE;