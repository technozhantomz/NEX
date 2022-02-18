import { useCallback } from "react";

import { usePeerplaysApi } from "../../modules/peerplaysApi";
import { Asset, Cache, IBalance, IFormAssetData } from "../types";

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
        cache.assets != undefined &&
        cache.assets.find((asset) => asset.id === id) !== undefined
      ) {
        return cache.assets.find((asset) => asset.id === id);
      }

      const asset: Asset = await dbApi("get_assets", [[id]]).then(
        (e: Asset[]) => e[0]
      );
      const assets =
        cache.assets != undefined ? [...cache.assets, asset] : [asset];
      setJsonCache({
        created: cache.created,
        accounts: cache.accounts,
        assets: assets,
        userAccount: cache.userAccount,
      });

      return asset;
    },
    [dbApi, jsonCache, setJsonCache]
  );

  const getAssetBySymbol = useCallback(
    async (symbol: string) => {
      const cache = jsonCache as Cache;
      if (
        Object.keys(cache).length > 0 &&
        cache.assets != undefined &&
        cache.assets.find((asset) => asset.symbol === symbol) !== undefined
      ) {
        return cache.assets.find((asset) => asset.symbol === symbol);
      }

      const asset: Asset = await dbApi("lookup_asset_symbols", [[symbol]]).then(
        (e: Asset[]) => e[0]
      );
      const assets =
        cache.assets != undefined ? [...cache.assets, asset] : [asset];
      setJsonCache({
        created: cache.created,
        accounts: cache.accounts,
        assets: assets,
        userAccount: cache.userAccount,
      });

      return asset;
    },
    [dbApi, jsonCache, setJsonCache]
  );

  const formAssetData = useCallback(async (data: IFormAssetData | IBalance) => {
    let id = data.asset_type || data.asset_id || data.id;
    let symbol = data.symbol;
    const amount = data.balance || data.amount || 0;
    let precision = data.precision;

    if (id && symbol && precision) return { id, amount, precision, symbol };
    if (id)
      await getAssetById(id).then((asset) => {
        symbol = asset?.symbol;
        precision = asset?.precision;
        return { id, amount, precision, symbol };
      });
    if (symbol)
      getAssetBySymbol(symbol).then((asset) => {
        id = asset?.id;
        precision = asset?.precision;
        return { id, amount, precision, symbol };
      });

    return { id, amount, precision, symbol };
  }, []);

  const setAssets = useCallback(async (assetId: string, quantity: number) => {
    const precision = await dbApi("get_assets", [[assetId]]).then(
      (asset) => asset[0].precision
    );
    return quantity / 10 ** precision;
  }, []);

  const setPrecision = useCallback(
    (roundTo: boolean, amount: number, precision: number) => {
      const precisioned = amount / 10 ** precision;
      return roundTo ? roundNum(precisioned, precision) : precisioned;
    },
    []
  );

  const toString = useCallback(
    (amount: number, symbol: string, precision: number) => {
      return `${setPrecision(true, amount, precision)} ${symbol}`;
    },
    []
  );

  return {
    getAssetById,
    getAssetBySymbol,
    formAssetData,
    setAssets,
    setPrecision,
    toString,
  };
}
