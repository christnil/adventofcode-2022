import { readLinesRemoveEmpty } from '../utils/input';
import { part1, part2 } from './fileSystme';

const lines = readLinesRemoveEmpty('src/day7/input');
const result1 = part1(lines);
const result2 = part2(lines);

console.log('Part 1: ', result1);
console.log('Part 2: ', result2);
