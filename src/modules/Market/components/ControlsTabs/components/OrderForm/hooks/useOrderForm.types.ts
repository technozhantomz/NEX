import { RadioChangeEvent } from "antd";

import { OrderForm } from "../../../../../../../common/types";
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
};

export type FormValidation = {
  price: Rule[];
  amount: Rule[];
  total: Rule[];
};
