CREATE TABLE "comment_like" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"liker_id" text NOT NULL,
	"comment_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "tags" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_liker_id_user_id_fk" FOREIGN KEY ("liker_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment_like" ADD CONSTRAINT "comment_like_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_comment_like" ON "comment_like" USING btree ("comment_id","liker_id");--> statement-breakpoint
CREATE INDEX "comment_id_idx" ON "comment_like" USING btree ("comment_id");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");