import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  pgTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/pg-core'
import { user } from './auth.ts'
import { baseColumns } from './base.ts'

export const article = pgTable('article', {
  ...baseColumns,
  title: text('title').notNull(),
  preview_image: text('preview_image').notNull(),
  preview_text: text('preview_text').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  tags: text('tags').array().notNull().default([]),
  is_published: boolean('is_published').notNull().default(false),
  is_featured: boolean('is_featured').notNull().default(false),
  author_id: text('author_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const comment = pgTable('comment', {
  ...baseColumns,
  content: text('content').notNull(),
  author_id: text('author_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  article_id: text('article_id')
    .notNull()
    .references(() => article.id, { onDelete: 'cascade' }),
})

export const like = pgTable(
  'like',
  {
    ...baseColumns,
    liker_id: text('author_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    article_id: text('article_id')
      .notNull()
      .references(() => article.id, { onDelete: 'cascade' }),
  },

  t => [
    uniqueIndex('unique_like').on(t.article_id, t.liker_id),
    index('article_id_idx').on(t.article_id),
  ],
)

export const commentLike = pgTable(
  'comment_like',
  {
    ...baseColumns,
    liker_id: text('liker_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    comment_id: text('comment_id')
      .notNull()
      .references(() => comment.id, { onDelete: 'cascade' }),
  },
  t => [
    uniqueIndex('unique_comment_like').on(t.comment_id, t.liker_id),
    index('comment_id_idx').on(t.comment_id),
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

export const commentRelations = relations(comment, ({ one, many }) => ({
  author: one(user, {
    fields: [comment.author_id],
    references: [user.id],
  }),
  article: one(article, {
    fields: [comment.article_id],
    references: [article.id],
  }),
  likes: many(commentLike),
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

export const commentLikeRelations = relations(commentLike, ({ one }) => ({
  liker: one(user, {
    fields: [commentLike.liker_id],
    references: [user.id],
  }),
  comment: one(comment, {
    fields: [commentLike.comment_id],
    references: [comment.id],
  }),
}))
