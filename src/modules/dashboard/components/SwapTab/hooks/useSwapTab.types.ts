import { FormInstance } from "antd/lib/form";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import FormFinishInfo from "rc-field-form";

export type Swap = {
  visible: boolean;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  onCancel: () => void;
  confirm: () => void;
  swapForm: FormInstance<SwapFormData>;
  handleAssetChange:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
};

export type SwapFormData = {
  sellAmount: number;
  buyAmount: number;
  sellAsset: string;
  buyAsset: string;
};
