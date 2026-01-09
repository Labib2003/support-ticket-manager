import { createSelectSchema } from 'drizzle-zod';
import * as schema from 'db/schema';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const selectTicketSchema = createSelectSchema(schema.tickets).extend({
  createdAt: z.string(),
});
export const TicketDto = createZodDto(selectTicketSchema);
Object.defineProperty(TicketDto, 'name', { value: 'TicketDto' });
