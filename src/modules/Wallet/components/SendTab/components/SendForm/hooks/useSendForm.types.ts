import { Dispatch, SetStateAction } from "react";

import { Asset, SignerKey } from "../../../../../../../common/types";
import {
  BaseOptionType,
  DefaultOptionType,
  FormInstance,
  Rule,
} from "../../../../../../../ui/src";

export type UseSendFormResult = {
  assets: Asset[];
  onAssetChange:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
  assetBlockchains: string[];
  sendForm: FormInstance<SendForm>;
  selectedAssetSymbol: string | undefined;
  selectedAsset: Asset | undefined;
  handleValuesChange: (changedValues: any) => void;
  onBlockchainChange: (value: unknown) => void;
  selectedBlockchain: string | undefined;
  formValdation: FormValidation;
  feeAmount: number;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  send: (signerKey: SignerKey) => Promise<void>;
  amount: string;
  localStorageAccount: string;
  toAccount: string;
  selectedAssetPrecission: number;
  btcTransferFee: number;
};
export type SendForm = {
  asset: string;
  to: string;
  amount: string;
  blockchain: string;
  memo?: string;
};

export type FormValidation = {
  asset: Rule[];
  to: Rule[];
  amount: Rule[];
  memo: Rule[];
  blockchain: Rule[];
};
