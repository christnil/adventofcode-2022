import { Schema } from './row-schema';

type Range = {
  from: number;
  to: number;
};

const parseRange = (rangeStr: string): Range => {
  const parts = rangeStr.split('-');
  return {
    from: parseInt(parts[0], 10),
    to: parseInt(parts[1], 10),
  };
};

const isIncluded = (range1: Range, range2: Range) => {
  return range1.from >= range2.from && range1.to <= range2.to;
};

const isSeparate = (range1: Range, range2: Range) => {
  return range1.to < range2.from || range1.from > range2.to;
};

const isOverlapping = (range1: Range, range2: Range) =>
  !isSeparate(range1, range2);

export const part1 = (schemas: Schema[]) => {
  return schemas
    .map((schema) => [parseRange(schema.range1), parseRange(schema.range2)])
    .map(
      ([range1, range2]) =>
        isIncluded(range1, range2) || isIncluded(range2, range1),
    )
    .filter((x) => x).length;
};

export const part2 = (schemas: Schema[]) => {
  return schemas
    .map((schema) => [parseRange(schema.range1), parseRange(schema.range2)])
    .map(([range1, range2]) => isOverlapping(range1, range2))
    .filter((x) => x).length;
};
