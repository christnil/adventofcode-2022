import { part1, part2 } from './sand';
import { expect } from 'chai';

describe('Day 14', function () {
  it('part 1', function () {
    const result = part1('src/day14/test');

    expect(result).to.equal(24);
  });
  it('part 2', function () {
    const result = part2('src/day14/test');

    expect(result).to.equal(93);
  });
});
