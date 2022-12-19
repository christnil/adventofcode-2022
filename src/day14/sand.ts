import { readLinesRemoveEmpty } from '../utils/input';

const DEBUG = false;

const EMPTY = 0;
const WALL = 1;
const SAND = 2;

type Point = {
  x: number;
  y: number;
};

type Vec = {
  x: number;
  y: number;
};

const pointEqual = (p1: Point, p2: Point): boolean => {
  return p1.x === p2.x && p1.y === p2.y;
};

const getInitialMap = (lines: string[]) => {
  const parsePoint = (str: string): Point => {
    const parts = str.split(',').map((x) => parseInt(x, 10));
    return {
      x: parts[0],
      y: parts[1],
    };
  };

  const getVec = (p1: Point, p2: Point): Vec => {
    const diffX = p2.x - p1.x;
    const diffY = p2.y - p1.y;
    return {
      x: diffX ? diffX / Math.abs(diffX) : 0,
      y: diffY ? diffY / Math.abs(diffY) : 0,
    };
  };

  const getNextPoint = (p: Point, v: Vec): Point => {
    return {
      x: p.x + v.x,
      y: p.y + v.y,
    };
  };

  const map: number[][] = [];
  let minX = 500;
  let maxX = 500;
  let minY = 0;
  let maxY = 0;
  for (const line of lines) {
    const points = line.split(' -> ').map(parsePoint);
    for (let i = 0; i < points.length - 1; i++) {
      let p = points[i];
      const target = points[i + 1];
      const v = getVec(p, target);
      while (p.x !== target.x || p.y !== target.y) {
        if (!map[p.y]) {
          map[p.y] = [];
        }
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
        map[p.y][p.x] = WALL;

        p = getNextPoint(p, v);
      }
      if (!map[p.y]) {
        map[p.y] = [];
      }
      map[p.y][p.x] = WALL;
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }

  return {
    map,
    minX,
    maxX,
    minY,
    maxY,
  };
};

const getPointValue = (map: number[][], p: Point, maxY?: number): number => {
  if (maxY && p.y === maxY + 2) {
    return WALL;
  }
  const row = map[p.y] || [];
  const val = row[p.x];
  return val || EMPTY;
};

const printMap = ({
  map,
  minX,
  maxX,
  minY,
  maxY,
}: {
  map: number[][];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}) => {
  let line = '';
  const print = (char: string) => {
    line += char;
  };
  const flush = () => {
    console.log(line);
    line = '';
  };
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const val = getPointValue(map, { x, y }, maxY);
      if (val === WALL) {
        print('#');
      } else if (val === SAND) {
        print('o');
      } else if (x === 500 && y === 0) {
        print('+');
      } else {
        print(' ');
      }
    }
    flush();
  }
};

const getNextSandPos = (p: Point, map: number[][], maxY?: number): Point => {
  const below = { x: p.x, y: p.y + 1 };
  if (getPointValue(map, below, maxY) === EMPTY) {
    return below;
  }
  const diagonal1 = { x: p.x - 1, y: p.y + 1 };
  if (getPointValue(map, diagonal1, maxY) === EMPTY) {
    return diagonal1;
  }
  const diagonal2 = { x: p.x + 1, y: p.y + 1 };
  if (getPointValue(map, diagonal2, maxY) === EMPTY) {
    return diagonal2;
  }
  return p;
};

export const part1 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const { map, minX, maxX, minY, maxY } = getInitialMap(lines);
  printMap({ map, minX, maxX, minY, maxY });
  let restedSandCount = 0;
  let done = false;
  while (!done) {
    let sandPos: Point = { x: 500, y: 0 };
    let sandNext = getNextSandPos(sandPos, map);
    while (!pointEqual(sandPos, sandNext) && sandPos.y < maxY) {
      sandPos = sandNext;
      sandNext = getNextSandPos(sandPos, map);
    }
    if (sandPos.y === maxY) {
      done = true;
    } else {
      restedSandCount++;
      if (!map[sandPos.y]) {
        map[sandPos.y] = [];
      }
      map[sandPos.y][sandPos.x] = SAND;
    }
    if (DEBUG) {
      printMap({ map, minX, maxX, minY, maxY });
    }
  }
  printMap({ map, minX, maxX, minY, maxY });
  return restedSandCount;
};

export const part2 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const { map, minX, maxX, minY, maxY } = getInitialMap(lines);
  printMap({ map, minX, maxX, minY, maxY: maxY + 2 });
  let restedSandCount = 0;
  let done = false;
  while (!done) {
    let sandPos: Point = { x: 500, y: 0 };
    let sandNext = getNextSandPos(sandPos, map);
    while (!pointEqual(sandPos, sandNext) && sandPos.y < maxY + 2) {
      sandPos = sandNext;
      sandNext = getNextSandPos(sandPos, map, maxY);
    }
    if (sandPos.y === 0) {
      done = true;
    } else {
      restedSandCount++;
      if (!map[sandPos.y]) {
        map[sandPos.y] = [];
      }
      map[sandPos.y][sandPos.x] = SAND;
    }
    if (DEBUG) {
      printMap({ map, minX, maxX, minY, maxY: maxY + 3 });
    }
  }
  printMap({ map, minX, maxX, minY, maxY: maxY + 2 });
  return restedSandCount + 1;
};
