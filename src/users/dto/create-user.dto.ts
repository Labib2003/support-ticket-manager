import z from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { users } from 'db/schema';

export const createUserSchema = createInsertSchema(users).omit({});
export type CreateUserDto = z.infer<typeof createUserSchema>;
