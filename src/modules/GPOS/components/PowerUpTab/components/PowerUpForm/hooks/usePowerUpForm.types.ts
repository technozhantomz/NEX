import { Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../../../../../common/hooks";
import { SignerKey } from "../../../../../../../common/types";
import { FormInstance, Rule } from "../../../../../../../ui/src";
import { GPOSBalances } from "../../../../../types";

export type UsePowerUpFormResult = {
  formValidation: FormValidation;
  powerUpForm: FormInstance<PowerUpForm>;
  adjustDeposit: (direction: string) => void;
  transactionMessageState: TransactionMessageState;
  transactionMessageDispatch: Dispatch<TransactionMessageAction>;
  handleVesting: (signerKey: SignerKey) => Promise<void>;
  feeAmount: number;
  depositAmount: string;
  newBalance: string;
  userAvailableBalance: number;
};

export type UsePowerUpFormArgs = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  calculateGposBalances: () => Promise<void>;
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
