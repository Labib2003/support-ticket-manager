import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './User';

export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),

  sessionId: varchar('session_id', { length: 255 }).notNull().unique(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type ISession = typeof sessions.$inferSelect;
