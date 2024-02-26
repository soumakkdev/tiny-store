DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(255) NOT NULL,
	"status" varchar(255),
	"price" numeric NOT NULL,
	"sku" varchar(255) NOT NULL,
	"images" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email_id" varchar(255) NOT NULL,
	"phone_no" varchar(255)
);
