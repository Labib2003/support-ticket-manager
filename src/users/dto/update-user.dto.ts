import { users } from 'db/schema';
import { createUpdateSchema } from 'drizzle-zod';
import z from 'zod';

export const updateUserSchema = createUpdateSchema(users);
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
