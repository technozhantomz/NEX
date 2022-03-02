export interface IAssetData {
  key: string;
  asset: string;
  available: number;
  price: number;
  change: string;
  value: number;
}

export type IAssetsTab = {
  tableAssets: IAssetsDataState;
};

export type IAssetsDataState = {
  dataSource: IAssetData[] | undefined;
  loading: boolean;
};
