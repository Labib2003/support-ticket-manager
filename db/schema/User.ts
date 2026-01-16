import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { sessions } from './Session';

export const userRoles = pgEnum('user_roles', ['USER', 'ADMIN']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),

  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: userRoles('role').default('USER').notNull(),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export type IUser = typeof users.$inferSelect;
export type ISafeUser = Omit<IUser, 'password'>;
