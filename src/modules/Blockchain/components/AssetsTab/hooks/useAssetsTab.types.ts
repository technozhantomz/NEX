import { Dispatch, SetStateAction } from "react";

export type UseAssetsTabResult = {
  loading: boolean;
  assetsColumns: AssetColumnType[];
  assetTableRows: AssetTableRow[] | undefined;
  assetsStats: number[];
  searchDataSource: AssetTableRow[];
  setSearchDataSource: Dispatch<SetStateAction<AssetTableRow[]>>;
};

export type AssetTableRow = {
  key: string;
  id: string;
  symbol: string;
  name: string;
  maxSupply: number;
  precision: number;
  issuer: string;
  info: string;
};

export type AssetColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render: ((symbol: string) => JSX.Element) | undefined;
  filters:
    | {
        text: string;
        value: string;
      }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: ((value: string, record: AssetTableRow) => boolean) | undefined;
  sorter:
    | ((
        a: {
          id: string;
        },
        b: {
          id: string;
        }
      ) => number)
    | ((
        a: {
          maxSupply: number;
        },
        b: {
          maxSupply: number;
        }
      ) => number)
    | ((
        a: {
          precision: number;
        },
        b: {
          precision: number;
        }
      ) => number)
    | undefined;
};
