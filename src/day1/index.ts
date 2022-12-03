import { readLines } from '../utils/input';
import { getMaxCalories, getMax3Calories } from './food';

const lines = readLines('input');
const max = getMaxCalories(lines);

const max3 = getMax3Calories(lines);

console.log('Max is: ', max);

console.log('Max top 3 is: ', max3);
