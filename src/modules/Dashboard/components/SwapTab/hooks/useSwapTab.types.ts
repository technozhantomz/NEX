import { FormInstance, Rule } from "antd/lib/form";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";

export type Swap = {
  visible: boolean;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
  onCancel: () => void;
  confirm: () => void;
  swapForm: FormInstance<SwapFormData>;
  formValdation: FormValidation;
  feeAmount: number;
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
