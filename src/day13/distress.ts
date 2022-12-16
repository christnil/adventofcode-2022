import { readLinesRemoveEmpty } from '../utils/input';

type Entry = number | Entry[];
type Result = 'CORRECT' | 'INCORRECT' | 'UNDEFINED';

const compareArrays = (left: Entry[], right: Entry[]): Result => {
  let index = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const l = left[index];
    const r = right[index];
    if (l === undefined && r === undefined) {
      return 'UNDEFINED';
    } else if (l === undefined) {
      return 'CORRECT';
    } else if (r === undefined) {
      return 'INCORRECT';
    } else if (typeof l === 'number' && typeof r === 'number') {
      if (l < r) {
        return 'CORRECT';
      }
      if (l > r) {
        return 'INCORRECT';
      }
    } else if (typeof l === 'number') {
      const inner = compareArrays([l], r as Entry[]);
      if (inner !== 'UNDEFINED') {
        return inner;
      }
    } else if (typeof r === 'number') {
      const inner = compareArrays(l as Entry[], [r]);
      if (inner !== 'UNDEFINED') {
        return inner;
      }
    } else if (typeof l !== 'number' && typeof r !== 'number') {
      const inner = compareArrays(l as Entry[], r as Entry[]);
      if (inner !== 'UNDEFINED') {
        return inner;
      }
    }
    index++;
  }
};

const compareLines = (left: string, right: string): boolean => {
  const arrLeft: Entry[] = eval(left);
  const arrRight: Entry[] = eval(right);
  const result = compareArrays(arrLeft, arrRight);
  return result === 'CORRECT';
};
const sortCompare = (left: string, right: string): number => {
  const arrLeft: Entry[] = eval(left);
  const arrRight: Entry[] = eval(right);
  const result = compareArrays(arrLeft, arrRight);
  if (result === 'CORRECT') {
    return -1;
  }
  if (result === 'INCORRECT') {
    return 1;
  }
  return 0;
};

export const part1 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);

  let sum = 0;
  for (let i = 0; i < lines.length / 2; i++) {
    if (compareLines(lines[i * 2], lines[i * 2 + 1])) {
      sum += i + 1;
    }
  }

  return sum;
};

export const part2 = (fileName: string) => {
  const lines = [...readLinesRemoveEmpty(fileName), '[[6]]', '[[2]]'];
  lines.sort(sortCompare);
  const firstDivider = lines.indexOf('[[2]]') + 1;
  const secondDivider = lines.indexOf('[[6]]') + 1;
  return firstDivider * secondDivider;
};
