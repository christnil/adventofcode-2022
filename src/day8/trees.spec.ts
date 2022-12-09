import { part1, part2, getScenicScore } from './trees';
import { expect } from 'chai';
import { readLinesRemoveEmpty } from '../utils/input';
describe('Day 8', function () {
  it('part 1', function () {
    const result = part1(readLinesRemoveEmpty('src/day8/test'));

    expect(result).to.equal(21);
  });
  it('part 2', function () {
    const result = part2(readLinesRemoveEmpty('src/day8/test'));

    expect(result).to.equal(8);
  });
});
