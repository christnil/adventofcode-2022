import { parseLinesRemoveEmpty } from '../utils/input';
import { part1, part2 } from './scheduling';
import { Schema, format } from './row-schema';

const lines = parseLinesRemoveEmpty('src/day4/input', Schema, format, ',');
const result1 = part1(lines);
const result2 = part2(lines);

console.log('Part 1: ', result1);
console.log('Part 2: ', result2);
