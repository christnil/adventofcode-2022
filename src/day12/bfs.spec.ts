import { part1, part2 } from './bfs';
import { expect } from 'chai';

describe('Day 12', function () {
  it('part 1', function () {
    const result = part1('src/day12/test');

    expect(result).to.equal(31);
  });
  it('part 1 real', function () {
    const result = part1('src/day12/input');

    expect(result).to.equal(31);
  });
  it('part 2', function () {
    const result = part2('src/day12/test');

    expect(result).to.equal(29);
  });
});
