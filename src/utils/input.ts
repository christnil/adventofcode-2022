import fs from 'fs';
import { z } from 'zod';

export const readLines = (fileName: string) => {
  return fs.readFileSync(fileName).toString().split('\n');
};

export const readLinesRemoveEmpty = (fileName: string) => {
  return readLines(fileName).filter((x) => x);
};

export function parseLine<T extends z.ZodSchema>(
  str: string,
  schema: T,
  format: (keyof z.infer<T>)[],
  { separator = ' ', fixedLength = true } = {},
): z.infer<T> {
  const parts = str.split(separator);
  if (format.length !== parts.length && fixedLength) {
    throw new Error(
      'Line (' + str + ') does not match pattern (' + format.join(' ') + ')',
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object: { [key in keyof T]?: any } = {};
  for (let i = 0; i < parts.length; i++) {
    object[format[i]] = parts[i];
  }
  return schema.parse(object);
}

export function parseLinesFromLines<T extends z.ZodSchema>(
  lines: string[],
  schema: T,
  format: (keyof z.infer<T>)[],
  options?: { separator: string; fixedLength: boolean },
): (z.infer<T> | null)[] {
  return lines.map((line) => {
    if (!line) {
      return null;
    }
    return parseLine(line, schema, format, options);
  });
}

export function parseLines<T extends z.ZodSchema>(
  fileName: string,
  schema: T,
  format: (keyof z.infer<T>)[],
  options?: { separator: string; fixedLength: boolean },
): (z.infer<T> | null)[] {
  const lines = readLines(fileName);
  return parseLinesFromLines(lines, schema, format, options);
}

export function parseLinesRemoveEmptyFromLines<T extends z.ZodSchema>(
  lines: string[],
  schema: T,
  format: (keyof z.infer<T>)[],
  options?: { separator: string; fixedLength: boolean },
): z.infer<T>[] {
  return parseLinesFromLines(lines, schema, format, options).filter(
    (x) => x !== null,
  );
}

export function parseLinesRemoveEmpty<T extends z.ZodSchema>(
  fileName: string,
  schema: T,
  format: (keyof z.infer<T>)[],
  options?: { separator: string; fixedLength: boolean },
): z.infer<T>[] {
  return parseLines(fileName, schema, format, options).filter(
    (x) => x !== null,
  );
}
