import { users } from 'db/schema';
import { createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const selectUserSchema = createSelectSchema(users);
export const UserDto = createZodDto(
  selectUserSchema.extend({
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
);
Object.defineProperty(UserDto, 'name', { value: 'UserDto' });
