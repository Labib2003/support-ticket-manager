import z from 'zod';

export const updateUserSchema = z.object({});
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
