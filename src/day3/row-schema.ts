import { z } from 'zod';

export const Bag = z.object({
  packing: z.string(),
});

export type Bag = z.infer<typeof Bag>;

export const format: (keyof Bag)[] = ['packing'];
