// import { Dispatch, SetStateAction } from "react";

import { Asset } from "../../../../../../../common/types";
import {
  BaseOptionType,
  DefaultOptionType,
  FormInstance,
} from "../../../../../../../ui/src";

// import { Account, SignerKey } from "../../../types";

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

  // feeAmount: number;
  // formValdation: FormValidation;
  // handleValuesChange: (changedValues: any) => void;
  // setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  // transactionErrorMessage: string;
  // setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  // transactionSuccessMessage: string;
  // transfer: (signerKey: SignerKey) => Promise<void>;
  // loadingTransaction: boolean;
  // toAccount: Account | undefined;
  // amount: string;
  // transferFee: number;
};
export type SendForm = {
  asset: string;
  to: string;
  amount: string;
  blockchain: string;
  memo?: string;
};

// export type FormField = {
//   field: string;
//   fullField: string;
//   type: string;
//   validator: unknown;
// };

// export type FormValidation = {
//   from: Rule[];
//   to: Rule[];
//   amount: Rule[];
//   asset: Rule[];
//   memo: Rule[];
// };
