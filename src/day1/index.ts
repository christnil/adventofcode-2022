import { parseLines } from '../utils/input';
import { getMaxCalories, getMax3Calories } from './food';
import { rowSchema, format } from './row-schema';

const lines = parseLines('src/day1/input', rowSchema, format);
const max = getMaxCalories(lines);

const max3 = getMax3Calories(lines);

console.log('Max is: ', max);

console.log('Max top 3 is: ', max3);
