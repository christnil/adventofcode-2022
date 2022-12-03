export const getMaxCalories = (lines: string[]) => {
  const itemsPerElf: { [key: string]: number } = {};
  let currentElf = 0;
  lines.forEach((line) => {
    if (!line) {
      currentElf += 1;
    } else {
      if (!itemsPerElf[currentElf]) {
        itemsPerElf[currentElf] = 0;
      }
      itemsPerElf[currentElf] += parseInt(line, 10);
    }
  });
  return Math.max(...Object.values(itemsPerElf));
};

export const getMax3Calories = (lines: string[]) => {
  const itemsPerElf: { [key: string]: number } = {};
  let currentElf = 0;
  lines.forEach((line) => {
    if (!line) {
      currentElf += 1;
    } else {
      if (!itemsPerElf[currentElf]) {
        itemsPerElf[currentElf] = 0;
      }
      itemsPerElf[currentElf] += parseInt(line, 10);
    }
  });
  const sorted = Object.values(itemsPerElf).sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
};
