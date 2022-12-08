import { getMaxCalories, getMax3Calories } from './food';
import { expect } from 'chai';

const input = [
  { calories: 1000 },
  { calories: 2000 },
  { calories: 3000 },
  null,
  { calories: 4000 },
  null,
  { calories: 5000 },
  { calories: 6000 },
  null,
  { calories: 7000 },
  { calories: 8000 },
  { calories: 9000 },
  null,
  { calories: 10000 },
];

describe('Day 1', function () {
  it('gets max calories from array', function () {
    const result = getMaxCalories(input);

    expect(result).to.equal(24000);
  });

  it('gets max 3 calories from array', function () {
    const result = getMax3Calories(input);

    expect(result).to.equal(45000);
  });
});
