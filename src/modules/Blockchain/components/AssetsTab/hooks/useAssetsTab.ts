import { uniq } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { utils } from "../../../../../api/utils";
import {
  useAccount,
  useArrayLimiter,
  useAsset,
} from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { AssetsColumns } from "../components";

import {
  AssetColumnType,
  AssetTableRow,
  UseAssetsTabResult,
} from "./useAssetsTab.types";

export function useAssetsTab(): UseAssetsTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataSource, setSearchDataSource] = useState<AssetTableRow[]>([]);
  const [assetTableRows, setAssetTableRows] = useState<AssetTableRow[]>([]);
  const [assetsStats, setAssetsStats] = useState<number[]>([]);
  const [assetsColumns, setAssetsColumns] = useState<AssetColumnType[]>([]);

  const { dbApi } = usePeerplaysApiContext();
  const { updateArrayWithLimit } = useArrayLimiter();
  const { getAllAssets } = useAsset();
  const { getAccounts } = useAccount();

  const getAssetRows = useCallback(async () => {
    try {
      const rawAssets = await getAllAssets();
      if (rawAssets && rawAssets.length > 0) {
        const rawAssetsIssuersIds = rawAssets.map((asset) => asset.issuer);
        const rawAssetsIssuersAccounnts = await getAccounts(
          rawAssetsIssuersIds
        );
        const assetsRows = rawAssets.map((asset) => {
          const issuer = rawAssetsIssuersAccounnts?.find(
            (account) => account?.id === asset.issuer
          );
          return {
            key: asset.id,
            id: asset.id,
            symbol: asset.symbol,
            name: utils.getBlockchainFromSymbol(asset.symbol),
            maxSupply: Number(asset.options.max_supply),
            precision: asset.precision,
            issuer: issuer ? issuer.name : "",
            info: asset.options.description,
          } as AssetTableRow;
        });

        const symbols = rawAssets.map((asset) => asset.symbol);
        const allIssuers = assetsRows.map((row) => row.issuer);
        const uniqIssuers = uniq(allIssuers);
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
        });
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
