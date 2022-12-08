import { readLines } from '../utils/input';
import { part1, part2 } from './stacking';

const lines = readLines('src/day5/input');
const result1 = part1(lines);
const result2 = part2(lines);

console.log('Part 1: ', result1);
console.log('Part 2: ', result2);
