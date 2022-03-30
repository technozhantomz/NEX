import { useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";

import { AssetData, AssetsTab } from "./useAssetsTab.types";

export function useAssetsTab(): AssetsTab {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [assets, setAssets] = useState<AssetData>({
    data: [],
    stats: [],
  });
  const { dbApi } = usePeerplaysApiContext();

  useEffect(() => {
    setInterval(() => getAssetData(), 3000);
  }, []);

  const getAssetData = async () => {
    const rawAssets = await dbApi("list_assets", ["", 99]).then((a) => a);
    const assetsData = await Promise.all(
      rawAssets.map(async (a) => {
        return {
          key: a.id,
          id: a.id,
          symbol: a.symbol,
          maxSupply: Number(a.options.max_supply),
          percision: a.precision,
          issuer: await dbApi("get_accounts", [[a.issuer]]).then(
            (u) => u[0].name
          ),
          info: a.symbol,
        };
      })
    );
    setAssets({
      data: assetsData,
      stats: updateStatsArray(assets.stats, assetsData.length),
    });
  };

  const updateStatsArray = (arr: number[], value: number) => {
    if (arr.length >= 99) {
      arr.shift();
      arr.push(value);
      return arr;
    }
    arr.push(value);
    return arr;
  };

  const onSearch = async (symbol: string) => {
    setLoading(true);
    setSearchValue(symbol);
    setLoading(false);
  };

  return { loading, assets, searchValue, onSearch };
}
