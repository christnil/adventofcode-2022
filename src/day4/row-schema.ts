import { z } from 'zod';

export const Schema = z.object({
  range1: z.string(),
  range2: z.string(),
});

export type Schema = z.infer<typeof Schema>;

export const format: (keyof Schema)[] = ['range1', 'range2'];
