import { z } from 'zod';
import { convertToNumber } from '../utils/zod-helpers';

export const Command = z.object({
  prefix: z.string(),
  command: z.string(),
  arg1: z.string().optional(),
});
export type Command = z.infer<typeof Command>;
export const commandFormat: (keyof Command)[] = ['prefix', 'command', 'arg1'];

export const File = z.object({
  size: convertToNumber(),
  name: z.string(),
});
export type File = z.infer<typeof File>;
export const fileFormat: (keyof File)[] = ['size', 'name'];

export const Dir = z.object({
  prefix: z.string(),
  name: z.string(),
});
export type Dir = z.infer<typeof Dir>;
export const dirFormat: (keyof Dir)[] = ['prefix', 'name'];
