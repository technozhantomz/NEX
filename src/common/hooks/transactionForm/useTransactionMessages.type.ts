import { Dispatch } from "react";

export enum TransactionMessageActionType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  LOADED_SUCCESS = "LOADED_SUCCESS",
  LOADED_ERROR = "LOADED_ERROR",
  LOADING = "LOADING",
  LOADED = "LOADED",
  CLEAR = "CLEAR",
}

export type TransactionMessageAction = {
  type: TransactionMessageActionType;
  message?: string;
};

export type TransactionMessageState = {
  transactionSuccessMessage: string;
  transactionErrorMessage: string;
  loadingTransaction: boolean;
};

export type UseTransactionMessageResult = {
  transactionMessageState: TransactionMessageState;
  dispatchTransactionMessage: Dispatch<TransactionMessageAction>;
};
