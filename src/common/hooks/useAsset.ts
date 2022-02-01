import { useCallback } from "react";

import { usePeerplaysApi } from "../../modules/peerplaysApi";
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
        return cache.assets.find((asset) => asset.id === id);
      }

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
  return {
    getAssetById,
    setPrecision,
  };
}
