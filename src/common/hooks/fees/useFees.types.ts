import { FeeParameter } from "../../types";

export type ChainOperations = {
  readonly [x: string]: number;
};

export type UseFeesResult = {
  findOperationFee: (operationType: string) => FeeParameter | undefined;
  calculteTransferFee: (memo: string) => number | undefined;
  calculateAccountUpgradeFee: () => number | undefined;
  feeParameters: FeeParameter[];
};
