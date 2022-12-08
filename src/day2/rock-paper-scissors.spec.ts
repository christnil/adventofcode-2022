import { getTotalScore, getTotalScoreWithOutcome } from './rock-paper-scissors';
import { expect } from 'chai';
import { Game } from './row-schema';

const input = [
  Game.parse({ opponent: 'A', me: 'Y' }),
  Game.parse({ opponent: 'B', me: 'X' }),
  Game.parse({ opponent: 'C', me: 'Z' }),
];

describe('Day 2', function () {
  it('gets total score of all games', function () {
    const result = getTotalScore(input);

    expect(result).to.equal(15);
  });

  it('gets total score of all games following win indications', function () {
    const result = getTotalScoreWithOutcome(input);

    expect(result).to.equal(12);
  });
});
