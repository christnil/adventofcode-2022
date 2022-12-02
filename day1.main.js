import { readLines } from './input.js'
import { getMaxCalories, getMax3Calories } from './day1.js'

const lines = readLines('input-1-1')
const max = getMaxCalories(lines)

const max3 = getMax3Calories(lines)

console.log('Max is: ', max)

console.log('Max top 3 is: ', max3)