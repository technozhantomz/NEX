import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { defaultQuote } from "../../../../../api/params/networkparams";
import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useUserContext } from "../../../../../common/components/UserProvider";
import { useAsset, useMarketPairStats } from "../../../../../common/hooks";
import { Asset } from "../../../../../common/types";

import { IAssetRow, UseAssetsTabResult } from "./useAssetsTab.types";

export function useAssetsTab(): UseAssetsTabResult {
  const [tableAssets, _setTableAssets] = useState<IAssetRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { dbApi } = usePeerplaysApiContext();
  const { assets, localStorageAccount } = useUserContext();
  const router = useRouter();
  const { getAssetBySymbol } = useAsset();
  const { getMarketPairStats } = useMarketPairStats();

  useEffect(() => {
    if (!localStorageAccount) router.push("/login");
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
    }
  }, [formAssetRow, _setTableAssets, setLoading, assets]);

  return { tableAssets, loading };
}
