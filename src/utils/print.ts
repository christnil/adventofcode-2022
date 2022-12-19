const printer = () => {
  let line = '';
  const print = (char: string) => {
    line += char;
  };
  const flush = () => {
    console.log(line);
    line = '';
  };
  return {
    print,
    flush,
  };
};

export default printer;
