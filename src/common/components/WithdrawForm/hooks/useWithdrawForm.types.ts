import { Dispatch, SetStateAction } from "react";

import { FormInstance, Rule } from "../../../../ui/src";
import { SidechainAcccount, SignerKey } from "../../../types";

export type UseWithdrawFormResult = {
  formValdation: FormValidation;
  withdrawForm: FormInstance<WithdrawForm>;
  handleValuesChange: (changedValues: any) => void;
  handleAssetChange: (value: unknown) => void;
  selectedAsset: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  handleWithdraw: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  amount: string;
  withdrawAddress: string;
  userBalance: number;
  withdrawFee: number;
  btcTransferFee: number;
  setBtcTransferFee: Dispatch<SetStateAction<number>>;
  selectedAssetPrecission: number;
  hasBTCDepositAddress: boolean;
  bitcoinSidechainAccount: SidechainAcccount | undefined;
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
