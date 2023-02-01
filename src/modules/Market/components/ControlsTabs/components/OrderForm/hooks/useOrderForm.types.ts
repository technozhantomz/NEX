import { RadioChangeEvent } from "antd";
import { Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../../../../../common/hooks";
import { OrderForm, SignerKey } from "../../../../../../../common/types";
import { FormInstance, Rule } from "../../../../../../../ui/src";

export type UseOrderFormResult = {
  balance: string;
  fees: {
    feeAmount: number;
    marketFeePercent: number;
  };
  formValidation: FormValidation;
  timePolicyOptions: {
    label: string;
    value: string;
  }[];
  orderForm: FormInstance<OrderForm>;
  handleValuesChange: (changedValues: any, allValues: any) => void;
  handlePriceRadioGroupChange: ({
    target: { value },
  }: RadioChangeEvent) => void;
  priceRadioValue: string | undefined;
  clearPriceRadioGroup: () => void;
  handlePriceSliderChange: (value: number) => void;
  priceSliderValue: number;
  timePolicy: TimePolicy;
  handleTimePolicyChange: (value: any) => void;
  transactionMessageDispatch: Dispatch<TransactionMessageAction>;
  transactionMessageState: TransactionMessageState;
  handleCreateLimitOrder: (signerKey: SignerKey) => Promise<void>;
  executionValue: ExecutionType;
  handleExecutionChange: ({ target: { value } }: RadioChangeEvent) => void;
};

export type FormValidation = {
  price: Rule[];
  amount: Rule[];
  total: Rule[];
};

export enum TimePolicy {
  Good_Til_Canceled = "good-til-canceled",
  Good_Til_Time = "good-til-time",
  Fill_Or_Kill = "fill-or-kill",
  Immediate_Or_Cancel = "immediate-or-cancel",
}

export type ExecutionType = "allow-taker" | "post-only";
