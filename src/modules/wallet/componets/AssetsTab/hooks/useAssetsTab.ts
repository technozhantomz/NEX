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
    // if (accountData === undefined) router.push("/login");
    if (accountData !== undefined) getAssetsData();
  }, [accountData]);

  const getAssetsData = async () => {
    const assetsData = await Promise.all(
      accountData !== undefined ? accountData?.assets.map(formAssetData) : []
    );
    setAssets({ dataSource: assetsData, loading: false });
  };

  const formAssetData = async (asset: Asset) => {
    const available = setPrecision(true, asset.amount, asset.precision);
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

  return { assets };
}
