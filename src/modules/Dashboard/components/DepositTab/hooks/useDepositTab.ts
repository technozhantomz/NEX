import { useCallback, useState } from "react";

import { UseDepositTabResult } from "./useDepositTab.types";

export function useDepositTab(): UseDepositTabResult {
  const [selectedAsset, setSelectedAsset] = useState<string>("BTC");
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
