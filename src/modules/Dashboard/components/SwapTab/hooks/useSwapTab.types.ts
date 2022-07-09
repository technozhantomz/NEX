import { FormInstance, Rule } from "antd/lib/form";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import FormFinishInfo from "rc-field-form";

import { CreateLimitOrderFee } from "../../../../../common/hooks/fees/useFees.types";

export type Swap = {
  visible: boolean;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  onCancel: () => void;
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
  selectedAssets: Record<string, string>;
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
