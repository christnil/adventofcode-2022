import { parseLine } from '../utils/input';
import {
  Command,
  commandFormat,
  Dir,
  dirFormat,
  File,
  fileFormat,
} from './row-schema';
import { sum } from '../utils/reduce';
import { numberAscending } from '../utils/sort';

const isCommand = (str: string) => str[0] === '$';
const isDir = (str: string) => str.startsWith('dir');

const getFileSystem = (rows: string[]) => {
  const dirSize: { [key: string]: number } = { '~': 0 };
  let currentPath: string[] = [];

  rows.forEach((row) => {
    if (isCommand(row)) {
      const command = parseLine(row, Command, commandFormat, {
        fixedLength: false,
      });
      if (command.command === 'cd') {
        if (command.arg1 === '/') {
          currentPath = [];
        } else if (command.arg1 === '..') {
          currentPath.pop();
        } else {
          currentPath.push(command.arg1 || '');
        }
      }
    } else if (!isDir(row)) {
      const file = parseLine(row, File, fileFormat);
      for (let i = 1; i <= currentPath.length; i++) {
        const key = currentPath.slice(0, i).join('/');
        if (!dirSize[key]) {
          dirSize[key] = 0;
        }
        dirSize[key] += file.size;
      }
      dirSize['~'] += file.size;
    }
  });
  return dirSize;
};
export const part1 = (rows: string[]) => {
  const dirSize = getFileSystem(rows);

  const belowLimit = Object.values(dirSize).filter((size) => size <= 100000);
  return belowLimit.reduce(sum, 0);
};

export const part2 = (rows: string[]) => {
  const TOTAL = 70000000;
  const REQUIRED = 30000000;
  const dirSize = getFileSystem(rows);
  const currentFree = TOTAL - dirSize['~'];
  const minToDelete = REQUIRED - currentFree;
  const options = Object.values(dirSize).filter((x) => x >= minToDelete);
  const sortedOptions = options.sort(numberAscending);
  return sortedOptions[0];
};
