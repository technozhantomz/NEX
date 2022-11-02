import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../../../../../common/hooks";
import { Asset } from "../../../../../../../common/types";
import { BaseOptionType, DefaultOptionType } from "../../../../../../../ui/src";

type UseAssetSelectorResult = {
  allAssets: Asset[];
  onChange:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
};
export function useAssetSelector(): UseAssetSelectorResult {
  const router = useRouter();

  const [allAssets, _setAllAssets] = useState<Asset[]>([]);
  const { getAllAssets } = useAsset();

  const setAllAssets = useCallback(async () => {
    try {
      const assets = await getAllAssets();
      if (assets && assets.length > 0) {
        _setAllAssets(assets);
      }
    } catch (e) {
      console.log(e);
    }
  }, [getAllAssets, _setAllAssets]);

  const onChange = useCallback(
    (value: unknown) => {
      router.push(`/wallet/${value}?tab=receive`);
    },
    [router]
  );

  useEffect(() => {
    setAllAssets();
  }, []);

  return {
    allAssets,
    onChange,
  };
}
