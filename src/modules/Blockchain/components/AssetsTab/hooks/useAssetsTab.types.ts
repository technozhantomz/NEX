export type UseAssetsTabResult = {
  loading: boolean;
  assetTableRows: AssetTableRow[];
  assetsStats: number[];
  searchValue: string;
  handleSearch: (symbol: string) => void;
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
