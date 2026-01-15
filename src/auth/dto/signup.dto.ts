import z from 'zod';
import { createInsertSchema } from 'drizzle-zod';
import { users } from 'db/schema';
import { createZodDto } from 'nestjs-zod';

export const signupSchema = createInsertSchema(users);
export type SignupDto = z.infer<typeof signupSchema>;
export const SignUpBody = createZodDto(
  signupSchema
    .omit({ id: true, createdAt: true, updatedAt: true })
    .extend({ email: z.string().email().trim(), password: z.string().min(8) }),
);
Object.defineProperty(SignUpBody, 'name', { value: 'SignUpBody' });
