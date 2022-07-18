import { FormInstance, Rule } from "antd/lib/form";
//import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import { Dispatch, SetStateAction } from "react";

import { Asset } from "../../../../../common/types";

export type UseSwapResult = {
  //confirm: () => void;
  swapForm: FormInstance<SwapForm>;
  // formValidation: FormValidation;
  // swapOrderFee: CreateLimitOrderFee | undefined;
  // handleAssetChange:
  //   | ((
  //       value: unknown,
  //       option:
  //         | DefaultOptionType
  //         | BaseOptionType
  //         | (DefaultOptionType | BaseOptionType)[]
  //     ) => void)
  //   | undefined;
  // swapAsset: () => void;
  // status: string;
  // assetValueInfo: string;
  // swapInfo: string;
  handleSellAssetChange: (value: unknown) => void;
  handleBuyAssetChange: (value: unknown) => void;
  selectedAssets: SwapAssetPair;
  localStorageAccount: string;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  allAssets: Asset[];
  swapOrderFee: number;
  price: number;
  loadingSwapData: boolean;
  loadingAssets: boolean;
  handleValuesChange: (changedValues: any) => Promise<void>;
  handleSwapAssets: () => void;
  buyAssetBalance: number;
  sellAssetBalance: number;
};

export type FormValidation = {
  sellAmount: Rule[];
  buyAmount: Rule[];
};

export type SwapForm = {
  sellAmount: number;
  buyAmount: number;
};

export type SwapAssetPair = {
  sellAssetSymbol: string;
  buyAssetSymbol: string;
};
