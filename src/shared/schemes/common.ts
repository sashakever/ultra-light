import {z} from 'zod';

export const metafieldScheme = z.object({
  key: z.string(),
  value: z.string(),
});
