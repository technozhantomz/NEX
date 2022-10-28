export interface IAssetRow {
  key: string;
  symbol: string;
  name: string;
  available: number;
  inOrders: string;
}

export type UseAssetsTabResult = {
  tableAssets: IAssetRow[];
  loading: boolean;
  assetsTabColumns: IAssetRow[];
};
