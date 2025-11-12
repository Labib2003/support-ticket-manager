import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userRole = pgEnum('user_role', ['ADMIN', 'USER']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: text('name').notNull(),
  email: text('email').notNull(),
  role: userRole('role').default('USER'),

  createdAt: timestamp('created_at').defaultNow(),
});
