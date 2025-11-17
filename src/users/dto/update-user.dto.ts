import { createUpdateSchema } from 'drizzle-zod';
import * as schema from 'db/schema';
import z from 'zod';

export const updateUserSchema = createUpdateSchema(schema.user);
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
