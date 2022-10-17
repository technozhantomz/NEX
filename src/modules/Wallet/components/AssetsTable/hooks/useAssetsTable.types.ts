export interface IAssetRow {
  key: string;
  asset: string;
  quoteAsset: string;
  available: number;
  price: string;
  change: string;
  volume: string;
}

export type UseAssetsTabResult = {
  tableAssets: IAssetRow[];
  loading: boolean;
};
