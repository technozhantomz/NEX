import { Asset } from "../types";

export type UseAssetResult = {
  getAssetById: (id: string) => Promise<Asset | undefined>;
  getAssetBySymbol: (symbol: string) => Promise<Asset | undefined>;
  setPrecision: (roundTo: boolean, amount: number, precision: number) => number;
  toString: (amount: number, symbol: string, precision: number) => string;
};
