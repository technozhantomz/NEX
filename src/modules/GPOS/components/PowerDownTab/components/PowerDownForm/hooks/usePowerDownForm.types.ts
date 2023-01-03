import { Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../../../../../common/hooks";
import { SignerKey } from "../../../../../../../common/types";
import { FormInstance, Rule } from "../../../../../../../ui/src";
import { GPOSBalances } from "../../../../../types";

export type UsePowerDownFormResult = {
  powerDownForm: FormInstance<PowerDownForm>;
  formValidation: FormValidation;
  adjustWithdraw: (direction: string) => void;
  transactionMessageState: TransactionMessageState;
  transactionMessageDispatch: Dispatch<TransactionMessageAction>;
  handleWithdraw: (signerKey: SignerKey) => Promise<void>;
  feeAmount: number;
  withdrawAmount: string;
  newBalance: string;
  newAvailableBalance: string;
};

export type UsePowerDownFormArgs = {
  gposBalances: GPOSBalances | undefined;
  loading: boolean;
  calculateGposBalances: () => Promise<void>;
};

export type PowerDownForm = {
  openingBalance: string;
  availableBalance: string;
  withdrawAmount: string;
  newBalance: string;
};

export type FormValidation = {
  withdrawAmount: Rule[];
};
