import z from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { users } from 'db/schema';

export const signupSchema = createInsertSchema(users);
export type SignupDto = z.infer<typeof signupSchema>;
