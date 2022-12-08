import { readLines } from '../utils/input';
import { part1, part2 } from './signal';

const lines = readLines('src/day6/input');
const result1 = part1(lines[0]);
const result2 = part2(lines[0]);

console.log('Part 1: ', result1);
console.log('Part 2: ', result2);
