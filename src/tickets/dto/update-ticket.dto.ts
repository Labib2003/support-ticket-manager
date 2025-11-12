import { createUpdateSchema } from 'drizzle-zod';
import * as schema from 'db/schema';
import z from 'zod';

export const updateTicketSchema = createUpdateSchema(schema.tickets);
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
