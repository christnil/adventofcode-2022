import { z } from 'zod';
import { convertToNumber } from '../utils/zod-helpers';

const directions = ['D', 'U', 'L', 'R'] as const;

export const Command = z.object({
  direction: z.enum(directions),
  amount: convertToNumber(),
});

export type Command = z.infer<typeof Command>;
export const commandFormat: (keyof Command)[] = ['direction', 'amount'];
