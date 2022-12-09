import { parseLinesRemoveEmpty } from '../utils/input';
import { Command, commandFormat } from './row-schema';
import { numberAscending } from '../utils/sort';
import { sum } from '../utils/reduce';

let line = '';
const print = (
  char: string,
  options?: { trailingNewLine?: boolean; leadingNewLine?: boolean },
) => {
  if (options?.leadingNewLine) {
    console.log(line);
    line = '';
  }
  line += char;
  if (options?.trailingNewLine) {
    console.log(line);
    line = '';
  }
};

const printEdge = (length: number) => {
  for (let i = 0; i < length; i++) {
    print('_');
  }
  print('', { trailingNewLine: true });
};

const printMap = (visitedPositions: VisitedPositions) => {
  const dimensions = getDimensions(visitedPositions);
  printEdge(dimensions.cols.max - dimensions.cols.min + 2);
  for (let i = dimensions.rows.min; i <= dimensions.rows.max; i++) {
    print('|');
    for (let j = dimensions.cols.min; j <= dimensions.cols.max; j++) {
      if ((visitedPositions[i] || {})[j]) {
        print('#');
      } else {
        print(' ');
      }
    }
    print('|', { trailingNewLine: true });
  }
  printEdge(dimensions.cols.max - dimensions.cols.min + 2);
};

const getCommands = (fileName: string) =>
  parseLinesRemoveEmpty(fileName, Command, commandFormat);

const getDimensions = (visitedPositions: VisitedPositions) => {
  const rows = Object.keys(visitedPositions)
    .map((k) => parseInt(k, 10))
    .sort(numberAscending);
  const cols = Object.values(visitedPositions)
    .flatMap((row) => Object.keys(row).map((k) => parseInt(k, 10)))
    .sort(numberAscending);
  return {
    rows: {
      min: rows[0],
      max: rows[rows.length - 1],
    },
    cols: {
      min: cols[0],
      max: cols[cols.length - 1],
    },
  };
};

type VisitedPositions = {
  [p: number]: { [p: number]: true };
};

type Point = {
  r: number;
  c: number;
};

type Vec = {
  r: -1 | 0 | 1;
  c: -1 | 0 | 1;
};

type Direction = Command['direction'];

const stdVecs: { [key in Direction]: Vec } = {
  U: { r: -1, c: 0 },
  D: { r: 1, c: 0 },
  L: { r: 0, c: -1 },
  R: { r: 0, c: 1 },
};

const applyVec = (point: Point, vec: Vec) => ({
  r: point.r + vec.r,
  c: point.c + vec.c,
});

const markAsVisited = (visitedPositions: VisitedPositions, position: Point) => {
  if (!visitedPositions[position.r]) {
    visitedPositions[position.r] = {};
  }
  visitedPositions[position.r][position.c] = true;
  return visitedPositions;
};

const getTVec = (hPos: Point, tPos: Point): Vec => {
  const r = hPos.r - tPos.r;
  const c = hPos.c - tPos.c;
  if (Math.abs(r) >= 2 || Math.abs(c) >= 2) {
    return {
      r: r === 0 ? 0 : r > 0 ? 1 : -1,
      c: c === 0 ? 0 : c > 0 ? 1 : -1,
    };
  }
  return { r: 0, c: 0 };
};

const countVisited = (visitedPositions: VisitedPositions) => {
  return Object.values(visitedPositions)
    .map((row) => Object.values(row).length)
    .reduce(sum, 0);
};

export const part1 = (fileName: string) => {
  const commands = getCommands(fileName);
  let hPos: Point = {
    r: 0,
    c: 0,
  };
  let tPos: Point = {
    r: 0,
    c: 0,
  };
  let visitedPositions: VisitedPositions = { 0: { 0: true } };
  commands.forEach((command) => {
    const vec = stdVecs[command.direction];
    for (let i = 0; i < command.amount; i++) {
      hPos = applyVec(hPos, vec);
      tPos = applyVec(tPos, getTVec(hPos, tPos));
      visitedPositions = markAsVisited(visitedPositions, tPos);
    }
  });
  printMap(visitedPositions);
  return countVisited(visitedPositions);
};

export const part2 = (fileName: string) => {
  const commands = getCommands(fileName);
  const positions: Point[] = [
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
    { r: 0, c: 0 },
  ];
  let visitedPositions: VisitedPositions = { 0: { 0: true } };
  commands.forEach((command) => {
    const vec = stdVecs[command.direction];
    for (let i = 0; i < command.amount; i++) {
      positions[0] = applyVec(positions[0], vec);
      for (let j = 1; j < positions.length; j++) {
        positions[j] = applyVec(
          positions[j],
          getTVec(positions[j - 1], positions[j]),
        );
      }
      visitedPositions = markAsVisited(
        visitedPositions,
        positions[positions.length - 1],
      );
    }
  });
  printMap(visitedPositions);
  return countVisited(visitedPositions);
};
