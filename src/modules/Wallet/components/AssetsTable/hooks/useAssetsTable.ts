import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params/networkparams";
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
    async (baseAsset: Asset): Promise<IAssetRow> => {
      const available = baseAsset.amount as number;
      const defaultQuoteAsset = await getAssetBySymbol(defaultToken as string);
      if (baseAsset.symbol !== defaultQuoteAsset.symbol) {
        const marketPairStats = await getMarketPairStats(
          baseAsset,
          defaultQuoteAsset
        );
        return {
          key: baseAsset.id,
          asset: baseAsset.symbol,
          quoteAsset: defaultToken as string,
          available,
          price: marketPairStats.latest,
          change: `${marketPairStats.percentChange}%`,
          volume: marketPairStats.volume,
        };
      }
      return {
        key: baseAsset.id,
        asset: baseAsset.symbol,
        quoteAsset: defaultToken as string,
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
