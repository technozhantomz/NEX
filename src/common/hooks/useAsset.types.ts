import { Asset, IBalance, IFormAssetData } from "../types";

export type UseAssetResult = {
  getAssetById: (id: string) => Promise<Asset>;
  getAssetBySymbol: (symbol: string) => Promise<Asset>;
  formAssetData: (data: IFormAssetData | IBalance) => Promise<Asset>;
  setPrecision: (roundTo: boolean, amount: number, precision: number) => number;
  setAssets: (assetId: string, quantity: number) => Promise<number>;
  toString: (amount: number, symbol: string, precision: number) => string;
};
