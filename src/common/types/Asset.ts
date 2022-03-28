export type Asset = {
  dynamic_asset_data_id?: string;
  id: string;
  precision: number;
  symbol: string;
  amount?: number;
};

export type Amount = {
  amount: number;
  asset_id: string;
};
