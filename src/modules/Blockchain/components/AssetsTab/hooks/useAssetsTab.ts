import { ColumnsType } from "antd/lib/table";
import { useCallback, useEffect, useState } from "react";

import { utils } from "../../../../../api/utils";
import { useArrayLimiter, useAsset } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Account } from "../../../../../common/types";
import { AssetsColumns } from "../components";

import { AssetTableRow, UseAssetsTabResult } from "./useAssetsTab.types";

export function useAssetsTab(): UseAssetsTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataSource, setSearchDataSource] = useState<AssetTableRow[]>([]);
  const [assetTableRows, setAssetTableRows] = useState<AssetTableRow[]>([]);
  const [assetsStats, setAssetsStats] = useState<number[]>([]);
  const [assetsColumns, setAssetsColumns] = useState<ColumnsType<unknown>>([]);
  const { dbApi } = usePeerplaysApiContext();
  const { updateArrayWithLimit } = useArrayLimiter();
  const { getAllAssets } = useAsset();

  const getAssetRows = useCallback(async () => {
    try {
      const rawAssets = await getAllAssets();
      if (rawAssets && rawAssets.length > 0) {
        const assetsRows = await Promise.all(
          rawAssets.map(async (asset) => {
            const issuer: Account[] = await dbApi("get_accounts", [
              [asset.issuer],
            ]);
            return {
              key: asset.id,
              id: asset.id,
              symbol: asset.symbol,
              name: utils.getBlockchainFromSymbol(asset.symbol),
              maxSupply: Number(asset.options.max_supply),
              precision: asset.precision,
              issuer: issuer && issuer.length > 0 ? issuer[0].name : "",
              info: asset.options.description,
            } as AssetTableRow;
          })
        );
        const symbols = rawAssets.map((asset) => asset.symbol);
        const allIssuers = await Promise.all(
          rawAssets.map(async (asset) => {
            const issuer: Account[] = await dbApi("get_accounts", [
              [asset.issuer],
            ]);
            return issuer && issuer.length > 0 ? issuer[0].name : "";
          })
        );
        const uniqIssuers = [...new Set(allIssuers)];
        const updatedColumns = AssetsColumns.map((column) => {
          switch (true) {
            case column.key === "symbol":
              column.filters = symbols.map((symbol) => {
                return { text: symbol, value: symbol };
              });
              break;
            case column.key === "issuer":
              column.filters = uniqIssuers.map((issuer) => {
                return { text: issuer, value: issuer };
              });
              break;
          }
          return { ...column };
        }) as ColumnsType<unknown>;
        setAssetsColumns(updatedColumns);
        setAssetTableRows(assetsRows);
        setSearchDataSource(assetsRows);
        setAssetsStats(
          updateArrayWithLimit(assetsStats, assetsRows.length, 99)
        );
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [
    dbApi,
    setAssetsStats,
    setAssetTableRows,
    updateArrayWithLimit,
    setLoading,
  ]);

  useEffect(() => {
    const assetInterval = setInterval(() => getAssetRows(), 3000);
    return () => {
      clearInterval(assetInterval);
    };
  }, []);

  return {
    loading,
    assetsColumns,
    assetTableRows,
    assetsStats,
    searchDataSource,
    setSearchDataSource,
  };
}
