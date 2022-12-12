import { z } from 'zod';
import { convertToNumber } from '../utils/zod-helpers';

const words = ['addx', 'noop'] as const;

export const Instruction = z.object({
  word: z.enum(words),
  arg: convertToNumber(-999999999, 999999999).optional(),
});

export type Instruction = z.infer<typeof Instruction>;
export const instructionFormat: (keyof Instruction)[] = ['word', 'arg'];
