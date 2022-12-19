import { part1, part2 } from './beacon';
import { expect } from 'chai';

describe('Day 15', function () {
  it('part 1', function () {
    const result = part1('src/day15/test', 10);

    expect(result).to.equal(26);
  });
  it('part 2', function () {
    const result = part2('src/day15/test', 20);

    expect(result).to.equal(56000011);
  });
});
