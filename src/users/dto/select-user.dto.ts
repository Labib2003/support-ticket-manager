import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const selectUserSchema = z.object({});
export const UserDto = createZodDto(selectUserSchema);
Object.defineProperty(UserDto, 'name', { value: 'UserDto' });
