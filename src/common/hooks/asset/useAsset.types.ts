import { Asset } from "../../types";

export type UseAssetResult = {
  formAssetBalanceById: (id: string, amount: number) => Promise<Asset>;
  getAssetById: (id: string) => Promise<Asset>;
  getAssetBySymbol: (symbol: string) => Promise<Asset>;
  setPrecision: (roundTo: boolean, amount: number, precision: number) => number;
  getAllAssets: () => Promise<Asset[] | undefined>;
  limitByPrecision: (value: string, precision?: number) => string;
  ceilPrecision: (
    num: string | number,
    precision?: number | undefined
  ) => string;
};
