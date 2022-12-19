import { readLinesRemoveEmpty } from '../utils/input';
import printerFactory from '../utils/print';

const printer = printerFactory();

const DEBUG = false;

type Point = {
  x: number;
  y: number;
};

type Range = {
  from: number;
  to: number;
};

const parseLine = (line: string): { beacon: Point; sensor: Point } => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const matches = line
    .match(/[-+]?[0-9]*\.?[0-9]+/g)
    .map((x) => parseInt(x, 10));

  return {
    sensor: {
      x: matches[0],
      y: matches[1],
    },
    beacon: {
      x: matches[2],
      y: matches[3],
    },
  };
};

const parseLines = (lines: string[]) => lines.map(parseLine);

const getManhattanDistance = (a: Point, b: Point) => {
  return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
};

const getRangeForPair = (beacon: Point, sensor: Point, row: number): Range => {
  const distance = getManhattanDistance(beacon, sensor);
  const mid = sensor.x;
  const radius = distance - Math.abs(sensor.y - row);
  return {
    from: mid - radius,
    to: mid + radius,
  };
};

export const part1 = (fileName: string, row: number) => {
  const lines = readLinesRemoveEmpty(fileName);
  const sensorBeaconPairs = parseLines(lines);
  const ranges = sensorBeaconPairs.map((pair) =>
    getRangeForPair(pair.beacon, pair.sensor, row),
  );
  const min = Math.min(...ranges.flatMap((r) => [r.from, r.to]));
  const max = Math.max(...ranges.flatMap((r) => [r.from, r.to]));
  let count = 0;
  if (DEBUG) {
    printer.print('' + min + ' - ');
  }
  for (let i = min; i <= max; i++) {
    if (
      ranges.some((r) => r.from <= i && r.to >= i) &&
      !sensorBeaconPairs.some(
        ({ beacon }) => beacon.x === i && beacon.y === row,
      )
    ) {
      count++;
      if (DEBUG) {
        printer.print('#');
      }
    } else if (DEBUG) {
      printer.print('.');
    }
  }
  if (DEBUG) {
    printer.print(' - ' + max);
  }
  printer.flush();
  return count;
};

export const part2 = (fileName: string, searchSpaceMax: number) => {
  const lines = readLinesRemoveEmpty(fileName);
  const sensorBeaconPairs = parseLines(lines);
  for (let row = 0; row <= searchSpaceMax; row++) {
    const ranges = sensorBeaconPairs.map((pair) =>
      getRangeForPair(pair.beacon, pair.sensor, row),
    );
    const possibleCols = ranges
      .flatMap((r) => [r.from - 1, r.to + 1])
      .filter((c) => c >= 0 && c <= searchSpaceMax);
    const col = possibleCols.find((c) =>
      ranges.every((r) => r.from > c || r.to < c),
    );
    if (col) {
      return col * 4000000 + row;
    }
  }
  return 0;
};
