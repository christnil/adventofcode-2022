import { z } from 'zod';

import { rowSchema } from './row-schema';
const getGroupedCalories = (lines: (z.infer<typeof rowSchema> | null)[]) => {
  const itemsPerElf: { [key: string]: number } = {};
  let currentElf = 0;
  lines.forEach((line) => {
    if (!line) {
      currentElf += 1;
    } else {
      if (!itemsPerElf[currentElf]) {
        itemsPerElf[currentElf] = 0;
      }
      itemsPerElf[currentElf] += line.calories;
    }
  });
  return Object.values(itemsPerElf);
};

export const getMaxCalories = (lines: (z.infer<typeof rowSchema> | null)[]) => {
  return Math.max(...getGroupedCalories(lines));
};

export const getMax3Calories = (
  lines: (z.infer<typeof rowSchema> | null)[],
) => {
  const groupedCategories = getGroupedCalories(lines);
  const sorted = groupedCategories.sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
};
