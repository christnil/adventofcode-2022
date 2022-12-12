import { part1, part2 } from './program';
import { expect } from 'chai';

describe('Day 10', function () {
  it('part 1', function () {
    const result = part1('src/day10/test');

    expect(result).to.equal(13140);
  });
  it('part 2', function () {
    const result = part2('src/day10/test');

    expect(result).to.equal(`##  ##  ##  ##  ##  ##  ##  ##  ##  ##  
###   ###   ###   ###   ###   ###   ### 
####    ####    ####    ####    ####    
#####     #####     #####     #####     
######      ######      ######      ####
#######       #######       #######     `);
  });
});
