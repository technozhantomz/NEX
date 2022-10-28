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
  assetsTabColumns: AssetsTabColumnType[];
};

export type AssetsTabColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((symbol: string) => JSX.Element) | undefined;
  filters: undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: ((value: string, record: IAssetRow) => boolean) | undefined;
  sorter: undefined;
};
