import { part1, part2 } from './packing-errors';
import { expect } from 'chai';
import { Bag } from './row-schema';

const input = [
  Bag.parse({ packing: 'vJrwpWtwJgWrhcsFMMfFFhFp' }),
  Bag.parse({ packing: 'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL' }),
  Bag.parse({ packing: 'PmmdzqPrVvPwwTWBwg' }),
  Bag.parse({ packing: 'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn' }),
  Bag.parse({ packing: 'ttgJtRGJQctTZtZT' }),
  Bag.parse({ packing: 'CrZsJsPPZsGzwwsLwLmpwMDw' }),
];

describe('Day 3', function () {
  it('part 1', function () {
    const result = part1(input);

    expect(result).to.equal(157);
  });
  it('part 2', function () {
    const result = part2(input);

    expect(result).to.equal(70);
  });
});
