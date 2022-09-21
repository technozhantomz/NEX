import { ColumnsType } from "antd/lib/table";
import { Dispatch, SetStateAction } from "react";

export type UseAssetsTabResult = {
  loading: boolean;
  assetsColumns: ColumnsType<unknown>;
  assetTableRows: AssetTableRow[];
  assetsStats: number[];
  searchDataSource: AssetTableRow[];
  setSearchDataSource: Dispatch<SetStateAction<AssetTableRow[]>>;
};

export type AssetTableRow = {
  key: string;
  id: string;
  symbol: string;
  // name: string;
  maxSupply: number;
  precision: number;
  issuer: string;
  info: string;
};
