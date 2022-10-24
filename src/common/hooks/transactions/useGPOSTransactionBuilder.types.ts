import { Asset, Transaction } from "../../types";

export type UseGPOSTransactionBuilderResult = {
  buildVestingBalanceCreateTransaction: (
    gposAsset: Asset,
    depositAmount: string,
    accountId: string
  ) => Transaction;
  buildVestingWithdrawTransaction: (
    gposAsset: Asset,
    withdrawAmount: string,
    vestingBalance: any,
    accountId: string
  ) => Transaction;
};
