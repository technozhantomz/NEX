import { Asset } from "../../types";

export type UseAssetResult = {
  formAssetBalanceById: (
    id: string,
    amount: number
  ) => Promise<Asset | undefined>;
  getAssetById: (id: string) => Promise<Asset | undefined>;
  getAssetBySymbol: (symbol: string) => Promise<Asset | undefined>;
  setPrecision: (
    roundTo: boolean,
    amount: number,
    precision?: number | undefined
  ) => number;
  getAllAssets: () => Promise<Asset[] | undefined>;
  limitByPrecision: (value: string, precision?: number) => string;
  ceilPrecision: (
    num: string | number,
    precision?: number | undefined
  ) => string;
  getAssetsBySymbols: (symbols: string[]) => Promise<(Asset | undefined)[]>;
};
