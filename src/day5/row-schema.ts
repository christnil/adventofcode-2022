import { z } from 'zod';
import { convertToNumber } from '../utils/zod-helpers';

export const Schema = z.object({
  action: z.string(),
  amount: convertToNumber(),
  from: z.string(),
  fromIndex: convertToNumber(),
  to: z.string(),
  toIndex: convertToNumber(),
});

export type Schema = z.infer<typeof Schema>;

export const format: (keyof Schema)[] = [
  'action',
  'amount',
  'from',
  'fromIndex',
  'to',
  'toIndex',
];
