import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
  bio: z
    .string()
    .max(255, {
      message: 'Bio should not be more than 255 characters',
    })
    .optional(),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Invalid email',
  }),
  phone: z
    .string()
    .max(11, {
      message: 'Phone number should not be more than 11 characters',
    })
    .optional(),
});
