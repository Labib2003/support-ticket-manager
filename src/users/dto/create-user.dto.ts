import { createInsertSchema } from 'drizzle-zod';
import * as schema from 'db/schema';
import z from 'zod';
import { roleNames } from 'src/lib/permissions';

export const createUserSchema = createInsertSchema(schema.user).extend({
  id: z.string().optional(),
  email: z.email(),
  password: z.string().min(8),
  image: z.url().optional(),
  role: z.enum(roleNames),
});
export type CreateUserDto = z.infer<typeof createUserSchema>;
