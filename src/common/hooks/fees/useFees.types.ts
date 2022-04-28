import { Asset, FeeParameter } from "../../types";

export type ChainOperations = {
  readonly [x: string]: number;
};

export type UseFeesResult = {
  findOperationFee: (operationType: string) => FeeParameter | undefined;
  calculteTransferFee: (memo: string) => number | undefined;
  calculateAccountUpgradeFee: () => number | undefined;
  calculateCreateLimitOrderFee: (
    base: Asset,
    quote: Asset
  ) => CreateLimitOrderFee | undefined;
  feeParameters: FeeParameter[];
};

export type CreateLimitOrderFee = {
  fee: number;
  buyMarketFeePercent: number;
  sellMarketFeePercent: number;
};
