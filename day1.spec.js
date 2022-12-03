import { getMaxCalories, getMax3Calories } from './day1.js';

const input = [
  '1000',
  '2000',
  '3000',
  '',
  '4000',
  '',
  '5000',
  '6000',
  '',
  '7000',
  '8000',
  '9000',
  '',
  '10000',
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
