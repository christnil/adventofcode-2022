import { z } from 'zod';
import { expect } from 'chai';
import sinon from 'sinon';

import fs from 'fs';

import { parseLines, parseLinesRemoveEmpty } from './input';
import { convertToNumber } from './zod-helpers';

describe('input', function () {
  afterEach(function () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fs as any).readFileSync.restore();
  });
  it('parses rows using schema', function () {
    sinon
      .stub(fs, 'readFileSync')
      .withArgs('test')
      .returns(Buffer.from('1 A abc\n\n2 B bcd'));
    const rowSchema = z.object({
      age: convertToNumber(),
      letter: z.string().min(1).max(1),
      word: z.string().min(1),
    });

    const lines = parseLines('test', rowSchema, ['age', 'letter', 'word']);

    expect(lines.length).to.equal(3);
    expect(lines[0]).to.eql({
      age: 1,
      letter: 'A',
      word: 'abc',
    });
    expect(lines[1]).to.be.null;
    expect(lines[2]).to.eql({
      age: 2,
      letter: 'B',
      word: 'bcd',
    });
  });

  it('parses rows and removes empty using schema', function () {
    sinon
      .stub(fs, 'readFileSync')
      .withArgs('test')
      .returns(Buffer.from('1 A abc\n\n2 B bcd'));
    const rowSchema = z.object({
      age: convertToNumber(),
      letter: z.string().min(1).max(1),
      word: z.string().min(1),
    });

    const lines = parseLinesRemoveEmpty('test', rowSchema, [
      'age',
      'letter',
      'word',
    ]);

    expect(lines.length).to.equal(2);
    expect(lines[0]).to.eql({
      age: 1,
      letter: 'A',
      word: 'abc',
    });
    expect(lines[1]).to.eql({
      age: 2,
      letter: 'B',
      word: 'bcd',
    });
  });
});
