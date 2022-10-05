export const getPassedTime = (start: Date): number =>
  new Date(new Date().valueOf() - start.valueOf()).getTime();
