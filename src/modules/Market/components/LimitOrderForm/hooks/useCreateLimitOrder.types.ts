import { Dispatch, KeyboardEvent, SetStateAction } from "react";

import { Asset } from "../../../../../common/types";
import { FormInstance, Rule } from "../../../../../ui/src";

export type UseCreateLimitOrderArgs = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  isBuyOrder: boolean;
  refreshHistory: () => void;
  refreshOrderBook: () => void;
};

export type UseCreateLimitOrderResult = {
  feeAmount: number;
  marketFeePercent: number;
  balance: number;
  orderForm: FormInstance<OrderForm>;
  formValidation: FormValidation;
  handleValuesChange: (changedValues: any, allValues: any) => void;
  handleCreateLimitOrder: (password: string) => Promise<void>;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  price: number;
  quantity: number;
  total: number;
  isNumberKey: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export type FormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type FormValidation = {
  price: Rule[];
  quantity: Rule[];
  total: Rule[];
};

export type OrderForm = {
  price: number;
  quantity: number;
  total: number;
};
