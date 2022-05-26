import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../../../../ui/src";
import { GPOSBalances } from "../../../../../types";

export type UsePowerUpFormResult = {
  formValidation: FormValidation;
  powerUpForm: FormInstance<PowerUpForm>;
  adjustDeposit: (direction: string) => void;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  handleVesting: (password: string) => Promise<void>;
  loadingTransaction: boolean;
  feeAmount: number;
  depositAmount: number;
  newBalance: number;
};

export type UsePowerUpFormArgs = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export type PowerUpForm = {
  openingBalance: string;
  depositAmount: number;
  newBalance: string;
};

export type FormValidation = {
  depositAmount: Rule[];
};
