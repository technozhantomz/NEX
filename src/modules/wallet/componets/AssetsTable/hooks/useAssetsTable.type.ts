import { ColumnsType } from "antd/lib/table";

export interface IAssetData {
  key: string;
  asset: string;
  available: number;
  price: number;
  change: string;
  value: number;
}

export type IAssetsTab = {
  assets: IAssetsDataState;
};

export type IAssetsDataState = {
  dataSource: IAssetData[] | undefined;
  loading: boolean;
};
