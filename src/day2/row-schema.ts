import { z } from 'zod';

export const Game = z.object({
  opponent: z.enum(['A', 'B', 'C']),
  me: z.enum(['X', 'Y', 'Z']),
});

export type Game = z.infer<typeof Game>;

export const format: (keyof Game)[] = ['opponent', 'me'];
