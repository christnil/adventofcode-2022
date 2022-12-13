export const numberAscending = (a: number, b: number) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};
export const numberPropAscending =
  (prop: string) =>
  <T extends { [key: string]: number }>(a: T, b: T) => {
    if (a[prop] > b[prop]) {
      return 1;
    }
    if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };

export const numberDescending = (a: number, b: number) => {
  if (a > b) {
    return -1;
  }
  if (a < b) {
    return 1;
  }
  return 0;
};
export const numberPropDescending =
  (prop: string) =>
  <T extends { [key: string]: number }>(a: T, b: T) => {
    if (a[prop] > b[prop]) {
      return -1;
    }
    if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
