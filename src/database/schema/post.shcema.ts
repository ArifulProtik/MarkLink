import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
});
