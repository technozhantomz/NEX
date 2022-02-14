import { ColumnsType } from "antd/lib/table";

export type IUseAssets = {
  columns: ColumnsType[];
  assetData: IAssetData[];
};

export type IAssetData = {
  key: string;
  asset: string;
  available: number;
  price: number;
  change: number;
  value: string;
  transfer: string;
  withdraw: string;
  deposit: string;
};
