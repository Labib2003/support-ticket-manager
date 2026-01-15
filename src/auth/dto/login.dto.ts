import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().length(8),
});
export type LoginDto = z.infer<typeof loginSchema>;
export const LoginBody = createZodDto(loginSchema);
Object.defineProperty(LoginBody, 'name', { value: 'LoginBody' });
