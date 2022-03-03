import { useCallback } from "react";

import { usePeerplaysApiContext } from "../components/PeerplaysApiProvider";
import { useSettingsContext } from "../components/SettingsProvider";
import { Asset, Cache } from "../types";

import { UseAssetResult } from "./useAsset.types";
import { roundNum } from "./useRoundNum";

export function useAsset(): UseAssetResult {
  const { dbApi } = usePeerplaysApiContext();
  const { cache, setCache } = useSettingsContext();

  const getAssetById = useCallback(
    async (id: string) => {
      if (
        Object.keys(cache).length > 0 &&
        cache.assets.length > 0 &&
        cache.assets.find((asset) => asset.id === id) !== undefined
      ) {
        return cache.assets.find((asset) => asset.id === id) as Asset;
      }
      try {
        const asset: Asset = await dbApi("get_assets", [[id]]).then(
          (e: Asset[]) => e[0]
        );
        const assets =
          cache.assets.length > 0 ? [...cache.assets, asset] : [asset];
        setCache({ created: cache.created, assets: assets } as Cache);

        return asset;
      } catch (e) {
        console.log(e);
        return {} as Asset;
      }
    },
    [dbApi, cache, setCache]
  );

  const getAssetBySymbol = useCallback(
    async (symbol: string) => {
      if (
        Object.keys(cache).length > 0 &&
        cache.assets.length > 0 &&
        cache.assets.find((asset) => asset.symbol === symbol) !== undefined
      ) {
        return cache.assets.find((asset) => asset.symbol === symbol) as Asset;
      }
      try {
        const asset: Asset = await dbApi("lookup_asset_symbols", [
          [symbol],
        ]).then((e: Asset[]) => e[0]);
        const assets =
          cache.assets.length > 0 ? [...cache.assets, asset] : [asset];
        setCache({ created: cache.created, assets: assets } as Cache);

        return asset;
      } catch (e) {
        console.log(e);
        return {} as Asset;
      }
    },
    [dbApi, cache, setCache]
  );

  const setPrecision = useCallback(
    (roundTo: boolean, amount: number, precision: number) => {
      const precisioned = amount / 10 ** precision;
      return roundTo ? roundNum(precisioned, precision) : precisioned;
    },
    []
  );

  const setAssets = useCallback(async (assetId: string, quantity: number) => {
    const precision = await dbApi("get_assets", [[assetId]]).then(
      (asset) => asset[0].precision
    );
    return quantity / 10 ** precision;
  }, []);

  const formAssetBalanceById = useCallback(
    async (id: string, amount: number) => {
      const asset = await getAssetById(id);
      asset.amount = setPrecision(false, amount, asset.precision);
      return asset;
    },
    [getAssetById, setPrecision]
  );

  return {
    formAssetBalanceById,
    getAssetById,
    setPrecision,
    setAssets,
    getAssetBySymbol,
  };
}
