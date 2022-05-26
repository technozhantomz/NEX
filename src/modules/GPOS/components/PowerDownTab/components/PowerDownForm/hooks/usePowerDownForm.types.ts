import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../../../../ui/src";
import { GPOSBalances } from "../../../../../types";

export type UsePowerDownFormResult = {
  powerDownForm: FormInstance<PowerDownForm>;
  formValidation: FormValidation;
  adjustWithdraw: (direction: string) => void;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  handleWithdraw: (password: string) => Promise<void>;
  feeAmount: number;
  withdrawAmount: number;
  newBalance: number;
  newAvailableBalance: number;
};

export type UsePowerDownFormArgs = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export type PowerDownForm = {
  openingBalance: string;
  availableBalance: string;
  withdrawAmount: number;
  newBalance: string;
};

export type FormValidation = {
  withdrawAmount: Rule[];
};
