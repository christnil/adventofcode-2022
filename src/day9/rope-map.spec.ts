import { part1, part2 } from './rope-map';
import { expect } from 'chai';

describe('Day 7', function () {
  it('part 1', function () {
    const result = part1('src/day9/test');

    expect(result).to.equal(13);
  });
  it('part 2', function () {
    const result = part2('src/day9/test2');

    expect(result).to.equal(36);
  });
});
