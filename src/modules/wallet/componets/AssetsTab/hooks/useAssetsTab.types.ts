export interface IAssetRow {
  key: string;
  asset: string;
  available: number;
  price: number;
  change: string;
  volume: number;
}

export type UseAssetsTabResult = {
  tableAssets: IAssetRow[];
  loading: boolean;
};
