import z from 'zod';

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().length(8),
});
export type LoginDto = z.infer<typeof loginSchema>;
