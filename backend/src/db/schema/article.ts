import { relations } from "drizzle-orm"
import {
  index,
  pgTable,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { user } from "./auth.ts"
import { baseColumns } from "./base.ts"

export const article = pgTable("article", {
  ...baseColumns,
  title: text("title").notNull(),
  preview_image: text("preview_image").notNull(),
  preview_text: text("preview_text").notNull(),
  content: text("content").notNull(),
  slug: text("slug").notNull().unique(),
  tags: text("tags").array().notNull().default([]),
  author_id: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
})

export const comment = pgTable("comment", {
  ...baseColumns,
  content: text("content").notNull(),
  author_id: text("author_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  article_id: text("article_id")
    .notNull()
    .references(() => article.id, { onDelete: "cascade" }),
})

export const like = pgTable(
  "like",
  {
    ...baseColumns,
    liker_id: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    article_id: text("article_id")
      .notNull()
      .references(() => article.id, { onDelete: "cascade" }),
  },

  t => [
    uniqueIndex("unique_like").on(t.article_id, t.liker_id),
    index("article_id_idx").on(t.article_id),
  ],
)

export const articleRelations = relations(article, ({ one, many }) => ({
  author: one(user, {
    fields: [article.author_id],
    references: [user.id],
  }),
  comments: many(comment),
  likes: many(like),
}))

export const commentRelations = relations(comment, ({ one }) => ({
  author: one(user, {
    fields: [comment.author_id],
    references: [user.id],
  }),
  article: one(article, {
    fields: [comment.article_id],
    references: [article.id],
  }),
}))

export const likeRelations = relations(like, ({ one }) => ({
  liker: one(user, {
    fields: [like.liker_id],
    references: [user.id],
  }),
  article: one(article, {
    fields: [like.article_id],
    references: [article.id],
  }),
}))
