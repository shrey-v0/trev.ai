DO $$ BEGIN
 CREATE TYPE "event_type" AS ENUM('PROpen', 'PRComments', 'PRReviewed', 'PRMerged', 'Commits', 'IncidentAlerts', 'IncidentsAck', 'IncidentsResolved');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "user_type" AS ENUM('Engineer', 'Manager');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AggregatedEvents" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"teamspace_id" integer,
	"value" integer,
	"event_type" "event_type",
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "EventMeta" (
	"event_type" "event_type" PRIMARY KEY NOT NULL,
	"teamspace_id" integer,
	"label" varchar NOT NULL,
	"fill_color" varchar NOT NULL,
	CONSTRAINT "EventMeta_event_type_unique" UNIQUE("event_type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Events" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"teamspace_id" integer,
	"key" uuid NOT NULL,
	"event_type" "event_type",
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Teamspace" (
	"id" serial PRIMARY KEY NOT NULL,
	"tenant_id" serial NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Tenant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"teamspace_id" integer,
	"email" varchar NOT NULL,
	"user_type" "user_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AggregatedEvents" ADD CONSTRAINT "AggregatedEvents_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AggregatedEvents" ADD CONSTRAINT "AggregatedEvents_teamspace_id_Teamspace_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "Teamspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AggregatedEvents" ADD CONSTRAINT "AggregatedEvents_event_type_EventMeta_event_type_fk" FOREIGN KEY ("event_type") REFERENCES "EventMeta"("event_type") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "EventMeta" ADD CONSTRAINT "EventMeta_teamspace_id_Teamspace_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "Teamspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Events" ADD CONSTRAINT "Events_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Events" ADD CONSTRAINT "Events_teamspace_id_Teamspace_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "Teamspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Events" ADD CONSTRAINT "Events_event_type_EventMeta_event_type_fk" FOREIGN KEY ("event_type") REFERENCES "EventMeta"("event_type") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Teamspace" ADD CONSTRAINT "Teamspace_tenant_id_Tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "User" ADD CONSTRAINT "User_teamspace_id_Teamspace_id_fk" FOREIGN KEY ("teamspace_id") REFERENCES "Teamspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
