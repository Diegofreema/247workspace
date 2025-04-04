import { z } from 'zod';
export const SignInValidator = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Please enter an email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});
export const SignUpValidator = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .min(1, { message: 'Please enter an email address' }),
  fullName: z.string().min(1, { message: 'Please enter your full name' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /[0-9]/.test(val) &&
        /[^A-Za-z0-9]/.test(val),
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      }
    ),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: 'Passwords must match',
//   path: ['confirmPassword'],
// });
