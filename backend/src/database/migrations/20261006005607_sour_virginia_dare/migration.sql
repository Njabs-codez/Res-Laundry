CREATE TABLE "machine_usages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"student_number" varchar NOT NULL,
	"machine_number" integer NOT NULL,
	"machine_type" "machine_type" NOT NULL,
	"time_in" timestamp DEFAULT now() NOT NULL,
	"duration" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "machine_usages" ADD CONSTRAINT "machine_usages_HliJ8LVfXJbh_fkey" FOREIGN KEY ("machine_number","machine_type") REFERENCES "machines"("number","type") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "machine_usages" ADD CONSTRAINT "machine_usages_student_number_users_student_number_fkey" FOREIGN KEY ("student_number") REFERENCES "users"("student_number");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "student_number_format" CHECK ("student_number" ~ '^u[0-9]{8}$');