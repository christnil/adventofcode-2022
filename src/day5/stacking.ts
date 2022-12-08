import { format, Schema } from './row-schema';
import { parseLinesRemoveEmptyFromLines } from '../utils/input';

const getStacks = (num: number): string[][] => {
  const stacks = [];
  for (let i = 0; i < num; i++) {
    stacks.push([]);
  }
  return stacks;
};

const getSetup = (setup: string[]) => {
  const header = setup[0];
  const numberOfStacks = (header.length + 1) / 4;
  const stacks = getStacks(numberOfStacks);
  for (let i = 1; i < setup.length; i++) {
    for (let j = 0; j < numberOfStacks; j++) {
      const lcrate = setup[i][4 * j];
      const char = setup[i][1 + 4 * j];
      const rcrate = setup[i][2 + 4 * j];
      if (lcrate === '[' && rcrate === ']') {
        stacks[j].unshift(char);
      }
    }
  }
  return stacks;
};

export const part1 = (rows: string[]) => {
  const emptyRow = rows.findIndex((row) => !row);
  const setup = rows.slice(0, emptyRow).reverse();
  const instructionsRows = rows.slice(emptyRow + 1);
  const stacks = getSetup(setup);
  const instructions = parseLinesRemoveEmptyFromLines(
    instructionsRows,
    Schema,
    format,
  );
  instructions.forEach((instruction) => {
    for (let i = 0; i < instruction.amount; i++) {
      const toMove = stacks[instruction.fromIndex - 1].shift() || '';
      stacks[instruction.toIndex - 1].unshift(toMove);
    }
  });
  return stacks.map((stack) => stack.shift() || ' ').join('');
};

export const part2 = (rows: string[]) => {
  const emptyRow = rows.findIndex((row) => !row);
  const setup = rows.slice(0, emptyRow).reverse();
  const instructionsRows = rows.slice(emptyRow + 1);
  const stacks = getSetup(setup);
  const instructions = parseLinesRemoveEmptyFromLines(
    instructionsRows,
    Schema,
    format,
  );
  instructions.forEach((instruction) => {
    const toMove =
      stacks[instruction.fromIndex - 1].splice(0, instruction.amount) || [];
    stacks[instruction.toIndex - 1].splice(0, 0, ...toMove);
  });
  return stacks.map((stack) => stack.shift() || ' ').join('');
};
