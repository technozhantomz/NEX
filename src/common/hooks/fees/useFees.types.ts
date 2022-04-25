import { FeeParameter } from "../../types";

export type ChainOperations = {
  readonly [x: string]: number;
};

export type UseFeesResult = {
  calculteTransferFee: (memo: string) => number | undefined;
  calculateAccountUpgradeFee: () => number | undefined;
  calulateGPOSFees: (transactionType: string) => number | undefined;
  feeParameters: FeeParameter[];
};
