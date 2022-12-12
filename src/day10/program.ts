import { parseLinesRemoveEmpty } from '../utils/input';
import { Instruction, instructionFormat } from './row-schema';
import { sum } from '../utils/reduce';

export const part1 = (fileName: string) => {
  const sampleAt: { [key: number]: true } = {
    20: true,
    60: true,
    100: true,
    140: true,
    180: true,
    220: true,
  };
  const samples = [];
  const instructions = parseLinesRemoveEmpty(
    fileName,
    Instruction,
    instructionFormat,
    { separator: ' ', fixedLength: false },
  );

  let reg = 1;
  let cycle = 1;
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    switch (instruction.word) {
      case 'noop':
        cycle++;
        break;
      case 'addx':
        cycle++;
        if (sampleAt[cycle]) {
          samples.push(cycle * reg);
        }
        cycle++;
        reg += instruction.arg || 0;
        break;
    }
    if (sampleAt[cycle]) {
      samples.push(cycle * reg);
    }
  }
  return samples.reduce(sum);
};

export const part2 = (fileName: string) => {
  const instructions = parseLinesRemoveEmpty(
    fileName,
    Instruction,
    instructionFormat,
    { separator: ' ', fixedLength: false },
  );

  let reg = 1;
  let cycle = 1;

  const display = [
    Array(40).fill(' '),
    Array(40).fill(' '),
    Array(40).fill(' '),
    Array(40).fill(' '),
    Array(40).fill(' '),
    Array(40).fill(' '),
  ];

  const draw = (pixelIn: number) => {
    const pixel = pixelIn - 1;
    const row = Math.floor(pixel / 40);
    const position = pixel % 40;
    if (position >= reg - 1 && position <= reg + 1) {
      display[row][position] = '#';
    }
  };

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    switch (instruction.word) {
      case 'noop':
        draw(cycle);
        cycle++;
        break;
      case 'addx':
        draw(cycle);
        cycle++;
        draw(cycle);
        cycle++;
        reg += instruction.arg || 0;
        break;
    }
  }

  display.forEach((row) => console.log(row.join('')));
  return display.map((row) => row.join('')).join('\n');
};
