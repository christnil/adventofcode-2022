import { parseLines } from '../utils/input';
import { getTotalScore, getTotalScoreWithOutcome } from './rock-paper-scissors';
import { Game, format } from './row-schema';

const lines = parseLines('src/day2/input', Game, format);
const score = getTotalScore(lines);
const score2 = getTotalScoreWithOutcome(lines);

console.log('Total score is: ', score);
console.log('Total score considering win conditions is: ', score2);
