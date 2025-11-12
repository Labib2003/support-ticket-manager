import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  content: text('content').notNull(),
  mediaUrl: text('media_url').notNull(),
});
