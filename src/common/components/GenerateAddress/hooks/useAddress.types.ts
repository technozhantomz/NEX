import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import { FormFinishInfo } from "rc-field-form";

export type GenerateAddress = {
  visible: boolean;
  onFormFinish: (name: string, info: FormFinishInfo) => void;
  onCancel: () => void;
  confirm: () => void;
  defaultHandleAssetChange:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
};
