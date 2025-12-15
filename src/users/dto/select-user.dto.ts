import { createSelectSchema } from 'drizzle-zod';
import * as schema from 'db/schema';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const selectUserSchema = createSelectSchema(schema.users).extend({
  createdAt: z.string(),
  updatedAt: z.string(),
  banExpires: z.string().nullable(),
});
export const UserDto = createZodDto(selectUserSchema);
Object.defineProperty(UserDto, 'name', { value: 'UserDto' });
