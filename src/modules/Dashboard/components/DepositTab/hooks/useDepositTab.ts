import { useCallback, useState } from "react";

import { BITCOIN_ASSET_SYMBOL } from "../../../../../api/params";

import { UseDepositTabResult } from "./useDepositTab.types";

export function useDepositTab(): UseDepositTabResult {
  const [selectedAsset, setSelectedAsset] =
    useState<string>(BITCOIN_ASSET_SYMBOL);
  const handleAssetChange = useCallback(
    (value: unknown) => {
      setSelectedAsset(value as string);
    },
    [setSelectedAsset]
  );
  return {
    handleAssetChange,
    selectedAsset,
  };
}
