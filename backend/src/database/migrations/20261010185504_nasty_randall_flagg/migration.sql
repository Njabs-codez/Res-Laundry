ALTER TABLE "users" ADD COLUMN "onboarding_token" varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "reset_password_token" SET DATA TYPE varchar USING "reset_password_token"::varchar;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "verification_token" SET DATA TYPE varchar USING "verification_token"::varchar;