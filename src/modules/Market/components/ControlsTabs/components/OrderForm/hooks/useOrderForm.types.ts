import { Rule } from "../../../../../../../ui/src";

export type UseOrderFormResult = {
  balance: string;
  fees: {
    feeAmount: number;
    marketFeePercent: number;
  };
  formValidation: FormValidation;
};

export type FormValidation = {
  price: Rule[];
  amount: Rule[];
  // total: Rule[];
};
