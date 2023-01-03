import { useReducer } from "react";

import {
  TransactionMessageAction,
  TransactionMessageActionType,
  TransactionMessageState,
  UseTransactionMessageResult,
} from "./useTransactionMessages.type";

function transactionMessageReducer(
  state: TransactionMessageState,
  action: TransactionMessageAction
): TransactionMessageState {
  const { type, message } = action;
  switch (type) {
    case TransactionMessageActionType.SUCCESS:
      return {
        ...state,
        transactionSuccessMessage: message as string,
      };
    case TransactionMessageActionType.LOADED_SUCCESS:
      return {
        ...state,
        transactionErrorMessage: "",
        transactionSuccessMessage: message as string,
        loadingTransaction: false,
      };
    case TransactionMessageActionType.ERROR:
      return {
        ...state,
        transactionErrorMessage: message as string,
      };
    case TransactionMessageActionType.LOADED_ERROR:
      return {
        ...state,
        transactionSuccessMessage: "",
        transactionErrorMessage: message as string,
        loadingTransaction: false,
      };
    case TransactionMessageActionType.LOADING:
      return {
        ...state,
        loadingTransaction: true,
      };
    case TransactionMessageActionType.LOADED:
      return {
        ...state,
        loadingTransaction: false,
      };
    case TransactionMessageActionType.CLEAR:
      return {
        ...state,
        transactionErrorMessage: "",
        transactionSuccessMessage: "",
      };
    default:
      return state;
  }
}

const initialState: TransactionMessageState = {
  transactionErrorMessage: "",
  transactionSuccessMessage: "",
  loadingTransaction: false,
};

export function useTransactionMessage(): UseTransactionMessageResult {
  const [transactionMessageState, transactionMessageDispatch] = useReducer(
    transactionMessageReducer,
    initialState
  );
  return {
    transactionMessageState,
    transactionMessageDispatch,
  };
}
