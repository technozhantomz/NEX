import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { defaultQuote } from "../../../../../api/params/networkparams";
import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useUserContext } from "../../../../../common/components/UserProvider";
import { roundNum, useAsset } from "../../../../../common/hooks";
import { Asset } from "../../../../../common/types";

import { IAssetsDataState, IAssetsTab } from "./useAssetsTab.type";

export function useAssetsTab(): IAssetsTab {
  const [tableAssets, setTableAssets] = useState<IAssetsDataState>({
    dataSource: [],
    loading: true,
  });
  const { dbApi } = usePeerplaysApiContext();
  const { assets, localStorageAccount } = useUserContext();
  const { setPrecision } = useAsset();
  const router = useRouter();

  useEffect(() => {
    if (localStorageAccount === null) router.push("/login");
    getAssetsData();
  }, []);

  const getAssetsData = async () => {
    const assetsData = await Promise.all(assets.map(formAssetData));
    setTableAssets({ dataSource: assetsData, loading: false });
  };

  const formAssetData = async (asset: Asset) => {
    const available = asset.amount;
    let price = 0;
    let change = "0%";
    let value = available;
    if (asset.symbol !== defaultQuote) {
      const tickerData = await dbApi("get_ticker", [
        asset.symbol,
        defaultQuote,
      ]);
      price = tickerData ? Number(parseFloat(tickerData.latest).toFixed(8)) : 0;
      change = tickerData
        ? `${parseFloat(tickerData.percent_change).toFixed(2)}%`
        : change;
      value = roundNum(available, price);
    }
    return {
      key: asset.id,
      asset: asset.symbol,
      available,
      price,
      change,
      value,
    };
  };

  return { tableAssets };
}
