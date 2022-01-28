export type UsePairDataResult = {
  getPairData: (assets: string[]) => Promise<{ base: any; quote: any }>;
};
