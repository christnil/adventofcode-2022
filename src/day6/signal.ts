const findUniqueWindow = (signalValues: string[], windowSize: number) => {
  const startIndex = signalValues.findIndex((_, index) => {
    if (index - windowSize + 1 < 0) {
      return false;
    }
    let mask = 0;
    for (let i = index - windowSize + 1; i <= index; i++) {
      const tmpMask =
        mask | (1 << (signalValues[i].charCodeAt(0) - 'a'.charCodeAt(0)));
      if (tmpMask === mask) {
        return false;
      }
      mask = tmpMask;
    }
    return true;
  });
  return startIndex + 1;
};

export const part1 = (signal: string) => {
  return findUniqueWindow(signal.split(''), 4);
};

export const part2 = (signal: string) => {
  return findUniqueWindow(signal.split(''), 14);
};
