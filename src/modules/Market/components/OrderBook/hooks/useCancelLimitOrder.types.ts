import { Dispatch, SetStateAction } from "react";

export type UseCancelLimitOrderArgs = {
  refreshHistory: () => void;
  refreshOrderBook: () => void;
  currentOrder: string;
};

export type UseCancelLimitOrderResult = {
  feeAmount: number;
  handleCancelLimitOrder: (password: string) => Promise<void>;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
};
