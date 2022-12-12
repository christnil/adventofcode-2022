import { readLines } from '../utils/input';
import { numberDescending } from '../utils/sort';
import { multiply } from '../utils/reduce';

type MonkeyItems = number[][];
type Operation = string;
type Check = (arg: number) => number;

const parseInput = (
  fileName: string,
): {
  monkeyItems: MonkeyItems;
  operations: Operation[];
  checks: Check[];
  divisors: number[];
} => {
  const lines = readLines(fileName);

  let monkey = 0;
  const monkeyItems: number[][] = [];
  const operations: Operation[] = [];
  const checks: Check[] = [];
  const divisors: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('Monkey')) {
      monkey = parseInt(line.split(' ')[1], 10);
    }
    if (line.startsWith('  Starting items: ')) {
      monkeyItems[monkey] = line
        .substring(line.indexOf(':') + 2)
        .split(', ')
        .map((item) => parseInt(item, 10));
    }
    if (line.startsWith('  Operation:')) {
      operations[monkey] = line.substring(line.indexOf('=') + 2);
    }
    if (line.startsWith('  Test:')) {
      const divisor = parseInt(
        line.substring(line.indexOf(':') + 2).split(' ')[2],
        10,
      );
      divisors[monkey] = divisor || 1;
      const test1 = lines[i + 1];
      const test2 = lines[i + 2];
      i += 2;
      const test1Arr = test1.trim().replace(':', '').split(' ');
      const test2Arr = test2.trim().replace(':', '').split(' ');
      checks[monkey] = (arg: number) => {
        const res = arg % divisor === 0;
        if (test1Arr[1] === res.toString()) {
          return parseInt(test1Arr[5], 10) || 0;
        }
        if (test2Arr[1] === res.toString()) {
          return parseInt(test2Arr[5], 10) || 0;
        }
        return 0;
      };
    }
  }

  return {
    monkeyItems,
    operations,
    checks,
    divisors,
  };
};

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
const replaceAll = (str: string, find: string, replace: string): string => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

export const part1 = (fileName: string) => {
  const state = parseInput(fileName);
  const numberOfInspections = Array(state.monkeyItems.length).fill(0);
  const NUMBER_OF_ITERATIONS = 20;
  for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    for (let j = 0; j < state.monkeyItems.length; j++) {
      numberOfInspections[j] += state.monkeyItems[j].length;
      state.monkeyItems[j].forEach((item) => {
        const newVal = Math.floor(
          eval(replaceAll(state.operations[j], 'old', item.toString())) / 3,
        );
        const newMonkey = state.checks[j](newVal);
        state.monkeyItems[newMonkey].push(newVal);
      });
      state.monkeyItems[j] = [];
    }
    console.log('\n\n', i + 1, '-------------------------------');
    console.log(state.monkeyItems.join('\n'));
    console.log('-------------------------------');
  }
  return numberOfInspections
    .sort(numberDescending)
    .slice(0, 2)
    .reduce(multiply, 1);
};

export const part2 = (fileName: string) => {
  const state = parseInput(fileName);
  const numberOfInspections = Array(state.monkeyItems.length).fill(0);
  const NUMBER_OF_ITERATIONS = 10000;
  const divisorProduct = state.divisors.reduce(multiply, 1);
  for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
    for (let j = 0; j < state.monkeyItems.length; j++) {
      numberOfInspections[j] += state.monkeyItems[j].length;
      state.monkeyItems[j].forEach((item) => {
        const newVal =
          eval(replaceAll(state.operations[j], 'old', item.toString())) %
          divisorProduct;
        const newMonkey = state.checks[j](newVal);
        state.monkeyItems[newMonkey].push(newVal);
      });
      state.monkeyItems[j] = [];
    }
    if (i % 1000 === 0) {
      console.log('\n\n', i + 1, '-------------------------------');
      console.log(state.monkeyItems.join('\n'));
      console.log('-------------------------------');
    }
  }
  return numberOfInspections
    .sort(numberDescending)
    .slice(0, 2)
    .reduce(multiply, 1);
};
