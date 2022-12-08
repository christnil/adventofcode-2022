import { part1, part2 } from './stacking';
import { expect } from 'chai';

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

describe('Day 5', function () {
  it('part 1', function () {
    const result = part1(input.split('\n'));

    expect(result).to.equal('CMZ');
  });
  it('part 2', function () {
    const result = part2(input.split('\n'));

    expect(result).to.equal('MCD');
  });
});
