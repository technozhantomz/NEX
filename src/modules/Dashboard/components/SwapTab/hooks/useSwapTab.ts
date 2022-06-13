import { useCallback, useState } from "react";

export function useSwapTab(): any {
  const [fromAsset, setFromAsset] = useState<string>("BTC");
  const [toAsset, setToAsset] = useState<string>("HIVE");

  const handleFromAssetChange = useCallback(
    (value: unknown) => {
      setFromAsset(value as string);
    },
    [fromAsset]
  );

  const handleToAssetChange = useCallback(
    (value: unknown) => {
      setToAsset(value as string);
    },
    [toAsset]
  );

  return {
    fromAsset,
    handleFromAssetChange,
    toAsset,
    handleToAssetChange,
  };
}
