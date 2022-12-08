import { part1, part2 } from './scheduling';
import { expect } from 'chai';
import { Schema } from './row-schema';

const input = [
  Schema.parse({ range1: '2-4', range2: '6-8' }),
  Schema.parse({ range1: '2-3', range2: '4-5' }),
  Schema.parse({ range1: '5-7', range2: '7-9' }),
  Schema.parse({ range1: '2-8', range2: '3-7' }),
  Schema.parse({ range1: '6-6', range2: '4-6' }),
  Schema.parse({ range1: '2-6', range2: '4-8' }),
];

describe('Day 4', function () {
  it('part 1', function () {
    const result = part1(input);

    expect(result).to.equal(2);
  });
  it('part 2', function () {
    const result = part2(input);

    expect(result).to.equal(4);
  });
});
