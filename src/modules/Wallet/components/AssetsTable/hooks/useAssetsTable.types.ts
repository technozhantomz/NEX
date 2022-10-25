export interface IAssetRow {
  key: string;
  symbol: string;
  name: string;
  available: number;
  change: string;
  volume: number;
}

export type UseAssetsTabResult = {
  tableAssets: IAssetRow[];
  loading: boolean;
  assetsTabColumns: IAssetRow[];
};
