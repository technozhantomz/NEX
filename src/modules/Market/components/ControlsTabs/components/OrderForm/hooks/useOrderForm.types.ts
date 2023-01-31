import { Rule } from "../../../../../../../ui/src";

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
};

export type FormValidation = {
  price: Rule[];
  amount: Rule[];
  total: Rule[];
};
