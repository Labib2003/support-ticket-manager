import z from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import * as schema from 'db/schema';

export const createTicketSchema = createInsertSchema(schema.posts).omit({
  id: true,
});
export type CreateTicketDto = z.infer<typeof createTicketSchema>;
