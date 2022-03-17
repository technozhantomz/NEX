import { BaseOptionType, DefaultOptionType } from "../../../../ui/src";

export type GenerateBitcoinAddressResult = {
  visible: boolean;
  onFormFinish: (name: string, info: { values: any; forms: any }) => void;
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
