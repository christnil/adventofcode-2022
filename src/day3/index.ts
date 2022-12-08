import { parseLinesRemoveEmpty } from '../utils/input';
import { part1, part2 } from './packing-errors';
import { Bag, format } from './row-schema';

const lines = parseLinesRemoveEmpty('src/day3/input', Bag, format);
const result1 = part1(lines);
const result2 = part2(lines);

console.log('Part 1: ', result1);
console.log('Part 2: ', result2);
