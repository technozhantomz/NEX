import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../../../common/types";
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
  handleVesting: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  feeAmount: number;
  depositAmount: string;
  newBalance: number;
  userAvailableBalance: number;
};

export type UsePowerUpFormArgs = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  getGposInfo: () => Promise<void>;
};

export type PowerUpForm = {
  openingBalance: string;
  depositAmount: string;
  newBalance: string;
  availableBalance: string;
};

export type FormValidation = {
  depositAmount: Rule[];
};
