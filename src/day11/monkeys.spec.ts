import { part1, part2 } from './monkeys';
import { expect } from 'chai';

describe('Day 11', function () {
  it('part 1', function () {
    const result = part1('src/day11/test');

    expect(result).to.equal(10605);
  });
  it('part 2', function () {
    const result = part2('src/day11/test');

    expect(result).to.equal(2713310158);
  });
});
