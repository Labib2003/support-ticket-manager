import { createInsertSchema } from 'drizzle-zod';
import * as schema from 'db/schema';
import z from 'zod';

export const createUserSchema = createInsertSchema(schema.users).extend({
  email: z.email(),
});
export type CreateUserDto = z.infer<typeof createUserSchema>;
