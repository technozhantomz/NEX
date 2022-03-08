import { FormInstance } from "antd/lib/form";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import FormFinishInfo from "rc-field-form";

export type Swap = {
  visible: boolean;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  onCancel: () => void;
  confirm: () => void;
  swapForm: FormInstance<SwapFormData>;
  handleAssetChange: (value: string) => void;
};

export type SwapFormData = {
  amount_to_sell: number;
  amount_to_receive: number;
  asset_to_sell: string;
  buyAsset: string;
};
