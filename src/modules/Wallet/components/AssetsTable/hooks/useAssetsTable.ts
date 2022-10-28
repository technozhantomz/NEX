import { useCallback, useEffect, useState } from "react";

import { utils } from "../../../../../api/utils";
import { useAsset, useMarketPairStats } from "../../../../../common/hooks";
import {
  useAssetsContext,
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";
import { AssetsTabColumns } from "../AssetsTabColumns";

import { IAssetRow, UseAssetsTabResult } from "./useAssetsTable.types";

export function useAssetsTable(): UseAssetsTabResult {
  const [tableAssets, _setTableAssets] = useState<IAssetRow[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [assetsTabColumns, setAssetsTabColumns] = useState<IAssetRow[]>([]);
  const { dbApi } = usePeerplaysApiContext();
  const { assets, localStorageAccount } = useUserContext();
  const { getAssetBySymbol } = useAsset();
  const { getMarketPairStats } = useMarketPairStats();
  const { defaultAsset } = useAssetsContext();
  const _assetsTabColumns = AssetsTabColumns();

  const formAssetRow = useCallback(
    async (baseAsset: Asset): Promise<IAssetRow> => {
      const available = baseAsset.amount as number;
      const defaultQuoteAsset = defaultAsset as Asset;
      if (baseAsset.symbol !== defaultQuoteAsset.symbol) {
        const marketPairStats = await getMarketPairStats(
          baseAsset,
          defaultQuoteAsset
        );
        return {
          key: baseAsset.id,
          symbol: baseAsset.symbol,
          name: utils.getBlockchainFromSymbol(baseAsset.symbol),
          available,
          inOrders: `${marketPairStats.percentChange}%`,
        };
      }
      return {
        key: baseAsset.id,
        symbol: baseAsset.symbol,
        name: utils.getBlockchainFromSymbol(baseAsset.symbol),
        available,
        inOrders: "0%",
      };
    },
    [dbApi, getMarketPairStats, getAssetBySymbol, defaultAsset]
  );

  const setTableAssets = useCallback(async () => {
    if (assets && assets.length && defaultAsset) {
      try {
        setLoading(true);
        const assetsRows = await Promise.all(assets.map(formAssetRow));
        _setTableAssets(assetsRows);
        const symbols = assetsRows.map((asset) => asset.symbol);
        const updateAssetsTabColumns = _assetsTabColumns.map((column) => {
          if (column.key === "symbol") {
            column.filters = symbols.map((symbol) => {
              return { text: symbol, value: symbol };
            });
          }
          return { ...column };
        });
        setAssetsTabColumns(updateAssetsTabColumns);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setLoading(false);
    }
  }, [formAssetRow, _setTableAssets, setLoading, assets, defaultAsset]);

  useEffect(() => {
    setTableAssets();
  }, [assets, localStorageAccount]);

  return { tableAssets, loading, assetsTabColumns };
}
