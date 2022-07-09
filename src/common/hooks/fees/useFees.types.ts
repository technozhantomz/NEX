import { Asset, FeeParameter } from "../../types";

export type ChainOperations = {
  readonly [x: string]: number;
};

export type UseFeesResult = {
  findOperationFee: (operationType: string) => FeeParameter | undefined;
  calculateTransferFee: (memo: string) => number | undefined;
  calculateAccountUpgradeFee: () => number | undefined;
  calculateGposVestingFee: () => number | undefined;
  calculateGposWithdrawFee: () => number | undefined;
  calculateCreateLimitOrderFee: (
    base: Asset,
    quote: Asset
  ) => CreateLimitOrderFee | undefined;
  calculateCancelLimitOrderFee: () => number | undefined;
};

export type CreateLimitOrderFee = {
  fee: number;
  buyMarketFeePercent: number;
  sellMarketFeePercent: number;
};

export type TransactionFee = {
  amount: number;
  asset_id: string;
};
