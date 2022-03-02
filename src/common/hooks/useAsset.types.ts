import { Asset } from "../types";

export type UseAssetResult = {
  formAssetBalanceById: (id: string, amount: number) => Promise<Asset>;
  getAssetById: (id: string) => Promise<Asset>;
  getAssetBySymbol: (id: string) => Promise<Asset>;
  setPrecision: (roundTo: boolean, amount: number, precision: number) => number;
};
