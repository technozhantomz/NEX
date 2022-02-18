import { useCallback } from "react";

import { usePeerplaysApi } from "../components/PeerplaysApi";
import { Asset, Cache } from "../types";

import { UseAssetResult } from "./useAsset.types";
import { useLocalStorage } from "./useLocalStorage";
import { roundNum } from "./useRoundNum";

export function useAsset(): UseAssetResult {
  const { dbApi } = usePeerplaysApi();
  const [jsonCache, setJsonCache] = useLocalStorage("cache");

  const getAssetById = useCallback(
    async (id: string) => {
      const cache = jsonCache as Cache;
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
        setJsonCache(
          JSON.stringify({
            created: cache.created,
            accounts: cache.accounts,
            assets: assets,
          })
        );

        return asset;
      } catch (e) {
        console.log(e);
        return {} as Asset;
      }
    },
    [dbApi, jsonCache, setJsonCache]
  );

  const getAssetBySymbol = useCallback(
    async (symbol: string) => {
      const cache = jsonCache as Cache;
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
        setJsonCache(
          JSON.stringify({
            created: cache.created,
            accounts: cache.accounts,
            assets: assets,
          })
        );

        return asset;
      } catch (e) {
        console.log(e);
        return {} as Asset;
      }
    },
    [dbApi, jsonCache, setJsonCache]
  );

  const setPrecision = useCallback(
    (roundTo: boolean, amount: number, precision: number) => {
      const precisioned = amount / 10 ** precision;
      return roundTo ? roundNum(precisioned, precision) : precisioned;
    },
    []
  );

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
    getAssetBySymbol,
  };
}
