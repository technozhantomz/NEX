import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { defaultQuote } from "../../../../../api/params/networkparams";
import { roundNum, useAsset } from "../../../../../common/hooks";
import { Asset } from "../../../../../common/types";
import { useUser } from "../../../../../context";
import { usePeerplaysApi } from "../../../../peerplaysApi";

import { IAssetsDataState, IAssetsTab } from "./useAssetsTab.type";

export function useAssetsTab(): IAssetsTab {
  const [assets, setAssets] = useState<IAssetsDataState>({
    dataSource: [],
    loading: true,
  });
  const { dbApi } = usePeerplaysApi();
  const { accountData } = useUser();
  const { setPrecision } = useAsset();
  const router = useRouter();

  useEffect(() => {
    if (accountData === undefined) router.push("/login");
    getAssetsData();
  }, []);

  const getAssetValue = (amount: number, price: number): number => {
    return roundNum(amount, price);
  };

  const getAssetChange = (symbol: string, percent_change: number) => {
    if (symbol === defaultQuote) return "0%";
    return !percent_change || percent_change == 0 ? `0%` : `${percent_change}%`;
  };

  const getAssetsData = async () => {
    const assetsData = await Promise.all(
      accountData?.assets.map(formAssetData)
    );
    setAssets({ dataSource: assetsData, loading: false });
  };

  const formAssetData = async (asset: Asset) => {
    const tickerData = await dbApi("get_ticker", [asset.symbol, defaultQuote]);
    const available = setPrecision(true, asset.amount, asset.precision);
    const price = tickerData.latest;
    const change = getAssetChange(asset.symbol, tickerData.percent_change);
    const value = getAssetValue(available, price);
    return {
      key: asset.id,
      asset: asset.symbol,
      available,
      price,
      change,
      value,
    };
  };

  return { assets };
}
