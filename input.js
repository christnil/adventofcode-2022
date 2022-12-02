import fs from 'fs'

export const readLines = (filenName) => {
  const lines = fs.readFileSync(filenName)
    .toString()
    .split('\n');

  return lines
}

export default readLines;

