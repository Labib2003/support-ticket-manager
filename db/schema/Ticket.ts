import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

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
  createdById: text('created_by_id').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});
