import { useCallback, useEffect, useState } from "react";

import { useArrayLimiter } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Account, Asset } from "../../../../../common/types";

import { AssetTableRow, UseAssetsTabResult } from "./useAssetsTab.types";

export function useAssetsTab(): UseAssetsTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [assetTableRows, setAssetTableRows] = useState<AssetTableRow[]>([]);
  const [assetsStats, setAssetsStats] = useState<number[]>([]);
  const { dbApi } = usePeerplaysApiContext();
  const { updateArrayWithLimit } = useArrayLimiter();
  const getAssetRows = useCallback(async () => {
    try {
      const rawAssets: Asset[] = await dbApi("list_assets", ["", 99]);
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
              maxSupply: Number(asset.options.max_supply),
              percision: asset.precision,
              issuer: issuer && issuer.length > 0 ? issuer[0].name : "",
              info: asset.options.description,
            } as AssetTableRow;
          })
        );
        setAssetTableRows(assetsRows);
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

  const handleSearch = useCallback(
    (symbol: string) => {
      setLoading(true);
      setSearchValue(symbol);
      setLoading(false);
    },
    [setLoading, setSearchValue]
  );

  useEffect(() => {
    setInterval(() => getAssetRows(), 3000);
  }, []);

  return { loading, assetTableRows, searchValue, handleSearch, assetsStats };
}
