import { FormInstance, Rule } from "antd/lib/form";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import FormFinishInfo from "rc-field-form";

import { TransactionFee } from "../../../../../common/hooks/useFees.types";

export type Swap = {
  visible: boolean;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  onCancel: () => void;
  confirm: () => void;
  swapForm: FormInstance<SwapFormData>;
  formValdation: FormValidation;
  feeData: TransactionFee | undefined;
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
