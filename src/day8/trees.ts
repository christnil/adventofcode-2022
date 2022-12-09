const getVisibilityGrid = (grid: number[][]) => {
  const height = grid.length;
  if (height === 0) {
    return [];
  }
  const width = grid[0].length;
  if (width === 0) {
    return [];
  }
  const visibilityChart = Array(height)
    .fill(1)
    .map(() => Array(width).fill(false));
  // pass from top left
  const topMax = Array(width).fill(-1);
  const leftMax = Array(height).fill(-1);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] > leftMax[i] || grid[i][j] > topMax[j]) {
        visibilityChart[i][j] = true;
      }
      leftMax[i] = Math.max(leftMax[i], grid[i][j]);
      topMax[j] = Math.max(topMax[j], grid[i][j]);
    }
  }
  // pass from bottom right
  const bottomMax = Array(width).fill(-1);
  const rightMax = Array(height).fill(-1);
  for (let i = height - 1; i >= 0; i--) {
    for (let j = width - 1; j >= 0; j--) {
      if (grid[i][j] > rightMax[i] || grid[i][j] > bottomMax[j]) {
        visibilityChart[i][j] = true;
      }
      rightMax[i] = Math.max(rightMax[i], grid[i][j]);
      bottomMax[j] = Math.max(bottomMax[j], grid[i][j]);
    }
  }
  return visibilityChart;
};

const parseGrid = (rows: string[]) => {
  return rows
    .filter((row) => !!row)
    .map((row) => row.split('').map((c) => parseInt(c, 10)));
};
export const part1 = (rows: string[]) => {
  const heightGrid = parseGrid(rows);
  const visibilityGrid = getVisibilityGrid(heightGrid);
  return visibilityGrid.reduce(
    (acc: number, row: boolean[]) =>
      acc + row.reduce((acc: number, curr: boolean) => acc + (curr ? 1 : 0), 0),
    0,
  );
};

export const getScenicScore = (grid: number[][], row: number, col: number) => {
  if (
    row === 0 ||
    col === 0 ||
    row === grid.length - 1 ||
    col === grid[row].length - 1
  ) {
    return 0;
  }
  let top = 0;
  for (let i = row - 1; i >= 0; i--) {
    top++;
    if (grid[i][col] >= grid[row][col]) {
      break;
    }
  }
  let left = 0;
  for (let i = col - 1; i >= 0; i--) {
    left++;
    if (grid[row][i] >= grid[row][col]) {
      break;
    }
  }
  let bottom = 0;
  for (let i = row + 1; i < grid.length; i++) {
    bottom++;
    if (grid[i][col] >= grid[row][col]) {
      break;
    }
  }
  let right = 0;
  for (let i = col + 1; i < grid[row].length; i++) {
    right++;
    if (grid[row][i] >= grid[row][col]) {
      break;
    }
  }
  return (top || 1) * (bottom || 1) * (left || 1) * (right || 1);
};

export const part2 = (rows: string[]) => {
  const grid = parseGrid(rows);
  return grid.reduce((acc: number, curr: number[], i) => {
    const rowMax = curr.reduce((racc: number, curr: number, j) => {
      const currenctScenicScore = getScenicScore(grid, i, j);
      return Math.max(racc, currenctScenicScore);
    }, 0);
    return Math.max(acc, rowMax);
  }, 0);
};
