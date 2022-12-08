import { z, ZodType } from 'zod';

const stringToNumberSchema = (def: number) =>
  z.string().default(`${def}`).transform(Number);
const safePreprocessor =
  <O, Z extends ZodType<O>>(preprocessorSchema: Z) =>
  (val: unknown): O | null => {
    const parsed = preprocessorSchema.safeParse(val);
    if (!parsed.success) {
      return null;
    }
    return parsed.data;
  };

export const convertToNumber = (min = 0, max = 999999999) => {
  return z.preprocess(
    safePreprocessor(stringToNumberSchema(0)),
    z.number().min(min).max(max),
  );
};
