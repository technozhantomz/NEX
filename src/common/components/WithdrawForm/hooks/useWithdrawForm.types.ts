import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";
import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../hooks";
import { SidechainAccount, SignerKey } from "../../../types";

export type UseWithdrawFormResult = {
  formValidation: FormValidation;
  withdrawForm: FormInstance<WithdrawForm>;
  handleValuesChange: (changedValues: { amount?: string }) => void;
  handleAssetChange: (value: unknown) => void;
  selectedAsset: string;
  transactionMessageState: TransactionMessageState;
  dispatchTransactionMessage: Dispatch<TransactionMessageAction>;
  handleWithdraw: (signerKey: SignerKey) => Promise<void>;
  amount: string;
  userBalance: number;
  withdrawFee: number;
  btcTransferFee: number;
  setBtcTransferFee: Dispatch<SetStateAction<number>>;
  selectedAssetPrecision: number;
  hasBTCDepositAddress: boolean;
  bitcoinSidechainAccount: SidechainAccount | undefined;
  getSidechainAccounts: (accountId: string) => Promise<void>;
  loadingSidechainAccounts: boolean;
};

export type FormField = {
  field: string;
  fullField: string;
  type: string;
  validator: unknown;
};

export type FormValidation = {
  from: Rule[];
  amount: Rule[];
  withdrawAddress: Rule[];
  withdrawPublicKey: Rule[];
};

export type WithdrawForm = {
  from: string;
  amount: string;
  withdrawAddress: string;
  withdrawPublicKey: string;
};
