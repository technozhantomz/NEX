import { Asset, Transaction } from "../../types";

export type UseGPOSTransactionBuilderResult = {
  buildVestingBalanceCreateTransaction: (
    gposAsset: Asset,
    depositAmount: number,
    accountId: string
  ) => Transaction;
  buildVestingWithdrawTransaction: (
    gposAsset: Asset,
    withdrawAmount: number,
    vestingBalance: any,
    accountId: string
  ) => Transaction;
};
