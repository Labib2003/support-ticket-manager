import { users } from 'db/schema';
import { createSelectSchema } from 'drizzle-zod';
import { createZodDto } from 'nestjs-zod';

export const selectUserSchema = createSelectSchema(users);
export const UserDto = createZodDto(selectUserSchema);
Object.defineProperty(UserDto, 'name', { value: 'UserDto' });
