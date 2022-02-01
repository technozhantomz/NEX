import { Asset } from "../types";

export type UseAssetResult = {
  getAssetById: (id: string) => Promise<Asset | undefined>;
  setPrecision: (roundTo: boolean, amount: number, precision: number) => number;
};
