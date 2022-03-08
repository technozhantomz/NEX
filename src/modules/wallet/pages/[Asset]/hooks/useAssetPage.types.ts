import { BaseOptionType, DefaultOptionType } from "antd/lib/select";

export type AssetPage = {
  handleAssetChange?:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
};
