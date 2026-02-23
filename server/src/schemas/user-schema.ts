import { z } from 'zod';

export const NewUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export const NewUserPasswordHashedSchema = z.object({
  username: z.string().min(3),
  password_hash: z.string().min(3),
});
