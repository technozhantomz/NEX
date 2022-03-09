import { Asset } from "../types";

export type UseAssetResult = {
  formAssetBalanceById: (id: string, amount: number) => Promise<Asset>;
  getAssetById: (id: string) => Promise<Asset>;
  getAssetBySymbol: (symbol: string) => Promise<Asset>;
  setPrecision: (roundTo: boolean, amount: number, precision: number) => number;
  setAssets: (assetId: string, quantity: number) => Promise<number>;
  getDefaultAsset: () => Promise<void>;
  defaultAsset: Asset | undefined;
};
