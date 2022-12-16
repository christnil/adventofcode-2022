import { part1, part2 } from './distress';
import { expect } from 'chai';

describe('Day 13', function () {
  it('part 1', function () {
    const result = part1('src/day13/test');

    expect(result).to.equal(13);
  });
  it('part 2', function () {
    const result = part2('src/day13/test');

    expect(result).to.equal(140);
  });
});
