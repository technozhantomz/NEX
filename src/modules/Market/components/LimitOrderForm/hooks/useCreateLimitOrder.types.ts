import { Dispatch, SetStateAction } from "react";

import { Asset, SignerKey } from "../../../../../common/types";
import { FormInstance, Rule } from "../../../../../ui/src";
import { OrderForm } from "../../../types";

export type UseCreateLimitOrderArgs = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  isBuyOrder: boolean;
  refreshHistory: () => void;
  refreshOrderBook: () => void;
  orderForm: FormInstance<OrderForm>;
};

export type UseCreateLimitOrderResult = {
  feeAmount: number;
  marketFeePercent: number;
  balance: number;
  formValidation: FormValidation;
  handleValuesChange: (changedValues: any, allValues: any) => void;
  handleCreateLimitOrder: (signerKey: SignerKey) => Promise<void>;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  price: string;
  quantity: string;
  total: string;
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
