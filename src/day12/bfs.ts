import { readLinesRemoveEmpty } from '../utils/input';
import { numberPropAscending } from '../utils/sort';

const getHeight = (char: string) => {
  if (char === 'S') {
    return 1;
  }
  if (char === 'E') {
    return 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }
  return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
};

type Point = {
  x: number;
  y: number;
};

type Edge = {
  x: number;
  y: number;
  distance: number;
};

const getGraph = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const original = lines.map((line) => line.split(''));
  const heightMap = lines.map((line) => line.split('').map(getHeight));
  const totalHeight = lines.length || 0;
  const totalWidth = lines[0].length;
  const edges = heightMap.map((row, y) =>
    row.map((height, x): Edge[] => {
      const ret: Edge[] = [];
      if (
        x - 1 >= 0 &&
        (heightMap[y][x - 1] === null ||
          (heightMap[y][x - 1] || 0) - (height || 0) <= 1)
      ) {
        ret.push({ x: x - 1, y, distance: 1 });
      }
      if (
        x + 1 < totalWidth &&
        (heightMap[y][x + 1] || 0) - (height || 0) <= 1
      ) {
        ret.push({ x: x + 1, y, distance: 1 });
      }
      if (y - 1 >= 0 && (heightMap[y - 1][x] || 0) - (height || 0) <= 1) {
        ret.push({ x, y: y - 1, distance: 1 });
      }
      if (
        y + 1 < totalHeight &&
        (heightMap[y + 1][x] || 0) - (height || 0) <= 1
      ) {
        ret.push({ x, y: y + 1, distance: 1 });
      }
      return ret;
    }),
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const start: Point = lines
    .map((line, y) => {
      const x = line.indexOf('S');
      if (x >= 0) {
        return {
          x,
          y,
        };
      }
      return null;
    })
    .find((x) => x !== null)!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const end: Point = lines
    .map((line, y) => {
      const x = line.indexOf('E');
      if (x >= 0) {
        return {
          x,
          y,
        };
      }
      return null;
    })
    .find((x) => x !== null)!;
  return { edges, start, end, original, heightMap };
};

export const printMap = (
  height: number,
  width: number,
  distanceMap: number[][],
  start: Point,
  end: Point,
  original: string[][],
  heightMap: number[][],
) => {
  let line = '';
  const print = (char: string) => {
    line += char;
  };
  const flush = () => {
    console.log(line);
    line = '';
  };
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (i === start.y && j === start.x) {
        print('S');
      } else if (i === end.y && j === end.x) {
        print('E');
      } else if (distanceMap[i][j] >= 0) {
        print('#');
      } else {
        print(original[i][j]);
      }
    }
    flush();
  }
};

export const part1 = (fileName: string) => {
  const { edges, start, end, original, heightMap } = getGraph(fileName);
  const queue: Edge[] = [{ ...start, distance: 0 }];
  const distancesFromStart = edges.map((row) => row.map(() => -1));
  while (queue.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const current = queue.shift()!;
    if (
      current.distance < distancesFromStart[current.y][current.x] ||
      distancesFromStart[current.y][current.x] === -1
    ) {
      distancesFromStart[current.y][current.x] = current.distance;
      edges[current.y][current.x].forEach((edge) => {
        queue.push({
          x: edge.x,
          y: edge.y,
          distance: current.distance + edge.distance,
        });
      });
      queue.sort(numberPropAscending('distance'));
    }
  }
  printMap(
    distancesFromStart.length,
    distancesFromStart[0].length,
    distancesFromStart,
    start,
    end,
    original,
    heightMap,
  );
  return distancesFromStart[end.y][end.x];
};

const getGraphInverse = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const original = lines.map((line) => line.split(''));
  const heightMap = lines.map((line) => line.split('').map(getHeight));
  const totalHeight = lines.length || 0;
  const totalWidth = lines[0].length;
  const edges = heightMap.map((row, y) =>
    row.map((height, x): Edge[] => {
      const ret: Edge[] = [];
      if (x - 1 >= 0 && height - heightMap[y][x - 1] <= 1) {
        ret.push({ x: x - 1, y, distance: 1 });
      }
      if (x + 1 < totalWidth && height - heightMap[y][x + 1] <= 1) {
        ret.push({ x: x + 1, y, distance: 1 });
      }
      if (y - 1 >= 0 && height - heightMap[y - 1][x] <= 1) {
        ret.push({ x, y: y - 1, distance: 1 });
      }
      if (y + 1 < totalHeight && height - heightMap[y + 1][x] <= 1) {
        ret.push({ x, y: y + 1, distance: 1 });
      }
      return ret;
    }),
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const start: Point = lines
    .map((line, y) => {
      const x = line.indexOf('S');
      if (x >= 0) {
        return {
          x,
          y,
        };
      }
      return null;
    })
    .find((x) => x !== null)!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const end: Point = lines
    .map((line, y) => {
      const x = line.indexOf('E');
      if (x >= 0) {
        return {
          x,
          y,
        };
      }
      return null;
    })
    .find((x) => x !== null)!;
  return { edges, start, end, original, heightMap };
};

export const part2 = (fileName: string) => {
  const { edges, start, end, original, heightMap } = getGraphInverse(fileName);
  const queue: Edge[] = [{ ...end, distance: 0 }];
  const distancesFromStart = edges.map((row) => row.map(() => -1));
  while (queue.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const current = queue.shift()!;
    if (
      current.distance < distancesFromStart[current.y][current.x] ||
      distancesFromStart[current.y][current.x] === -1
    ) {
      distancesFromStart[current.y][current.x] = current.distance;
      edges[current.y][current.x].forEach((edge) => {
        queue.push({
          x: edge.x,
          y: edge.y,
          distance: current.distance + edge.distance,
        });
      });
      queue.sort(numberPropAscending('distance'));
    }
  }
  printMap(
    distancesFromStart.length,
    distancesFromStart[0].length,
    distancesFromStart,
    start,
    end,
    original,
    heightMap,
  );
  const allPoints = distancesFromStart.flatMap((row, y) =>
    row.map((distance, x) => ({ x, y, distance })),
  );
  const allStartingPoints = allPoints.filter(
    (point) => heightMap[point.y][point.x] === 1 && point.distance > 0,
  );
  const sortedStartingPoints = allStartingPoints.sort(
    numberPropAscending('distance'),
  );
  console.log(sortedStartingPoints[0]);
  return sortedStartingPoints[0].distance;
};
