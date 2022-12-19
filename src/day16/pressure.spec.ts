import { part1, part2 } from './pressure';
import { expect } from 'chai';

describe('Day 16', function () {
  it('part 1', function () {
    const result = part1('src/day16/test');

    expect(result).to.equal(1651);
  });
  it('part 2', function () {
    const result = part2('src/day16/test');

    expect(result).to.equal(1707);
  });
});
