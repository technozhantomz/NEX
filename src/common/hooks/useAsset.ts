import { useCallback, useMemo } from "react";

import { usePeerplaysApiContext, useSettingsContext } from "../providers";
import { Asset, Cache } from "../types";

import { UseAssetResult } from "./useAsset.types";
import { roundNum } from "./useRoundNum";

export function useAsset(): UseAssetResult {
  const { dbApi } = usePeerplaysApiContext();
  const { cache, setCache: _setCache } = useSettingsContext();

  const assetsCacheExists = useMemo(() => {
    return Object.keys(cache).length > 0 && cache.assets.length > 0;
  }, [cache, cache.assets]);

  const setAssetsCache = useCallback(
    (asset: Asset) => {
      const assets =
        cache.assets.length > 0
          ? [
              ...cache.assets,
              {
                dynamic_asset_data_id: asset.dynamic_asset_data_id
                  ? asset.dynamic_asset_data_id
                  : undefined,
                id: asset.id,
                issuer: asset.issuer,
                options: asset.options,
                precision: asset.precision,
                symbol: asset.symbol,
              } as Asset,
            ]
          : [asset];
      _setCache({ created: cache.created, assets: assets } as Cache);
    },
    [cache, cache.assets, _setCache]
  );

  const getAssetById = useCallback(
    async (id: string) => {
      if (
        assetsCacheExists &&
        cache.assets.find((asset) => asset.id === id) !== undefined
      ) {
        return cache.assets.find((asset) => asset.id === id) as Asset;
      }
      try {
        const asset: Asset = await dbApi("get_assets", [[id]]).then(
          (e: Asset[]) => e[0]
        );
        setAssetsCache(asset);

        return asset;
      } catch (e) {
        console.log(e);
        return {} as Asset;
      }
    },
    [dbApi, cache, setAssetsCache, assetsCacheExists]
  );

  const getAssetBySymbol = useCallback(
    async (symbol: string) => {
      if (
        assetsCacheExists &&
        cache.assets.find((asset) => asset.symbol === symbol) !== undefined
      ) {
        return cache.assets.find((asset) => asset.symbol === symbol) as Asset;
      }
      try {
        const asset: Asset = await dbApi("lookup_asset_symbols", [
          [symbol],
        ]).then((e: Asset[]) => e[0]);
        setAssetsCache(asset);
        return asset;
      } catch (e) {
        console.log(e);
        return {} as Asset;
      }
    },
    [dbApi, cache, setAssetsCache, assetsCacheExists]
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
      return {
        ...asset,
        amount: setPrecision(false, amount, asset.precision),
      } as Asset;
    },
    [getAssetById, setPrecision]
  );

  const getAllAssets = useCallback(async () => {
    try {
      const allAssets: Asset[] = await dbApi("list_assets", ["", 99]);
      return allAssets;
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  const limitByPrecision = (value: string, precision = 8) => {
    value = !value.includes("e") ? value : Number(value).toFixed(20);
    const splitString = value.split(".");
    if (
      splitString.length === 1 ||
      (splitString.length === 2 && splitString[1].length <= precision)
    ) {
      return value;
    } else {
      const limitedValue =
        splitString[0] + "." + splitString[1].substr(0, precision);
      return limitedValue;
    }
  };

  return {
    formAssetBalanceById,
    getAssetById,
    setPrecision,
    getAssetBySymbol,
    getAllAssets,
    limitByPrecision,
  };
}
