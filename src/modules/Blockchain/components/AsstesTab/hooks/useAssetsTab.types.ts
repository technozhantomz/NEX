export type AssetsTab = {
  loading: boolean;
  assets: AssetData;
  searchValue: string;
  onSearch: (symbol: string) => void;
};

export type AssetData = {
  data: AssetTableRow[];
  stats: number[];
};

export type AssetTableRow = {
  key: string;
  id: string;
  symbol: string;
  maxSupply: number;
  percision: number;
  issuer: string;
  info: string;
};
