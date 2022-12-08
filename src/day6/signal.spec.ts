import { part1, part2 } from './signal';
import { expect } from 'chai';

describe('Day 6', function () {
  it('part 1', function () {
    expect(part1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).to.equal(7);
    expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).to.equal(5);
    expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).to.equal(6);
    expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).to.equal(10);
    expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).to.equal(11);
  });
  it('part 2', function () {
    expect(part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).to.equal(19);
    expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).to.equal(23);
    expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).to.equal(23);
    expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).to.equal(29);
    expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).to.equal(26);
  });
});
