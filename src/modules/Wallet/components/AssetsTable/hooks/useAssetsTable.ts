import { useCallback, useEffect, useState } from "react";

import { defaultQuote } from "../../../../../api/params/networkparams";
import { useAsset, useMarketPairStats } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import { IAssetRow, UseAssetsTabResult } from "./useAssetsTable.types";

export function useAssetsTable(): UseAssetsTabResult {
  const [tableAssets, _setTableAssets] = useState<IAssetRow[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { dbApi } = usePeerplaysApiContext();
  const { assets, localStorageAccount } = useUserContext();
  const { getAssetBySymbol } = useAsset();
  const { getMarketPairStats } = useMarketPairStats();

  useEffect(() => {
    setTableAssets();
  }, [assets, localStorageAccount]);

  const formAssetRow = useCallback(
    async (asset: Asset): Promise<IAssetRow> => {
      const available = asset.amount as number;
      const defaultBaseAsset = await getAssetBySymbol(defaultQuote as string);
      if (asset.symbol !== defaultQuote) {
        const marketPairStats = await getMarketPairStats(
          defaultBaseAsset,
          asset
        );
        return {
          key: asset.id,
          asset: asset.symbol,
          available,
          price: marketPairStats.latest,
          change: `${marketPairStats.percentChange}%`,
          volume: marketPairStats.volume,
        };
      }
      return {
        key: asset.id,
        asset: asset.symbol,
        available,
        price: 0,
        change: "0.0%",
        volume: 0,
      };
    },
    [dbApi, getMarketPairStats, getAssetBySymbol]
  );

  const setTableAssets = useCallback(async () => {
    if (assets && assets.length) {
      try {
        setLoading(true);
        const assetsRows = await Promise.all(assets.map(formAssetRow));
        _setTableAssets(assetsRows);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setLoading(false);
    }
  }, [formAssetRow, _setTableAssets, setLoading, assets]);

  return { tableAssets, loading };
}
