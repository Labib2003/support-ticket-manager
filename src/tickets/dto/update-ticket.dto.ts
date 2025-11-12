import { createUpdateSchema } from 'drizzle-zod';
import * as schema from 'src/db/schema';
import z from 'zod';

export const updateTicketSchema = createUpdateSchema(schema.posts);
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
