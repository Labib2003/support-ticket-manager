import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './User';

export const ticketStatus = pgEnum('ticket_status', [
  'OPEN',
  'IN_PROGRESS',
  'CLOSED',
]);

export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),

  title: text('title').notNull(),
  body: text('body').notNull(),
  status: ticketStatus('status').default('OPEN'),
  createdById: uuid('created_by_id')
    .notNull()
    .references(() => users.id),

  createdAt: timestamp('created_at').defaultNow(),
});
