CREATE TYPE "machine_status" AS ENUM('healthy', 'unhealthy');--> statement-breakpoint
CREATE TYPE "machine_type" AS ENUM('washing machine', 'dryer');--> statement-breakpoint
CREATE TABLE "machines" (
	"number" integer,
	"type" "machine_type" DEFAULT 'washing machine'::"machine_type",
	"status" "machine_status" DEFAULT 'healthy'::"machine_status" NOT NULL,
	CONSTRAINT "machines_pkey" PRIMARY KEY("number","type")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"student_number" varchar(9) PRIMARY KEY,
	"first_name" varchar(255) DEFAULT 'College' NOT NULL,
	"last_name" varchar(255) DEFAULT 'Man' NOT NULL,
	"password" varchar DEFAULT 'not assigned' NOT NULL,
	"room_number" varchar(7) DEFAULT 'not assigned' NOT NULL,
	"cellphone_number" varchar(10) DEFAULT 'not assigned' NOT NULL,
	"refresh_token" varchar(255),
	"reset_password_token" varchar(255)
);
