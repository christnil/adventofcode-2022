import fs from 'fs';

export const readLines = (fileName: string) => {
  return fs.readFileSync(fileName).toString().split('\n');
};

export default readLines;
