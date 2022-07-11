import { FormInstance, Rule } from "antd/lib/form";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import { Dispatch, SetStateAction } from "react";

import { CreateLimitOrderFee } from "../../../../../common/hooks/fees/useFees.types";

export type Swap = {
  confirm: () => void;
  swapForm: FormInstance<SwapFormData>;
  formValidation: FormValidation;
  swapOrderFee: CreateLimitOrderFee | undefined;
  handleAssetChange:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
  swapAsset: () => void;
  status: string;
  assetValueInfo: string;
  swapInfo: string;
  selectedAssets: Record<string, string>;
  localStorageAccount: string;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  feeAmount: number | undefined;
  handleSwap: (password: string) => Promise<any>;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
};

export type FormValidation = {
  sellAmount: Rule[];
  buyAmount: Rule[];
  sellAsset: Rule[];
  buyAsset: Rule[];
};

export type SwapFormData = {
  sellAmount: number;
  buyAmount: number;
  sellAsset: string;
  buyAsset: string;
};

export type SwapAssetPair = {
  sellAsset: string;
  buyAsset: string;
};
