import z from 'zod';

const ticketSchema = z.strictObject({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
});

export const createTicketSchema = ticketSchema;

export type CreateTicketDto = z.infer<typeof createTicketSchema>;
