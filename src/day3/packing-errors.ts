import { Bag } from './row-schema';
import { sum } from '../utils/reduce';

const charsLower = 'abcdefghijklmnopqrstuvwxyz';
const allChars = charsLower + charsLower.toUpperCase();
const values: { [key: string]: number } = allChars
  .split('')
  .reduce((accum, curr, index) => {
    return {
      ...accum,
      [curr]: index + 1,
    };
  }, {});
const getCharValue = (char: string) => values[char] || 0;

const split = (input: string) => {
  const arr = input.split('');
  return {
    first: arr.slice(0, arr.length / 2),
    second: arr.slice(arr.length / 2),
  };
};

const findDuplicate = (bag: Bag) => {
  const { first, second } = split(bag.packing);
  return first.find((char) => second.includes(char)) || '';
};

const findArrayDuplicate = (first: string[], second: string[]) => {
  return first.find((char) => second.includes(char)) || '';
};

const findArrayDuplicates = (first: string[], second: string[]) => {
  return first.filter((char) => second.includes(char)) || [];
};

export const part1 = (bags: Bag[]) => {
  return bags.map(findDuplicate).map(getCharValue).reduce(sum, 0);
};

export const part2 = (bags: Bag[]) => {
  let sum = 0;
  for (let i = 0; i < bags.length; i += 3) {
    sum += getCharValue(
      findArrayDuplicate(
        bags[i].packing.split(''),
        findArrayDuplicates(
          bags[i + 1].packing.split(''),
          bags[i + 2].packing.split(''),
        ),
      ),
    );
  }
  return sum;
};
