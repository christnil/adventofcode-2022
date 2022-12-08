import { z } from 'zod';
import { convertToNumber } from '../utils/zod-helpers';

export const rowSchema = z.object({
  calories: convertToNumber(),
});

export const format: (keyof z.infer<typeof rowSchema>)[] = ['calories'];
