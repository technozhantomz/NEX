import { useCallback } from "react";

import { usePeerplaysApi } from "../../../../peerplaysApi";

import { UsePairDataResult } from "./usePairData.types";

export function usePairData(): UsePairDataResult {
  const { dbApi } = usePeerplaysApi();

  const getPairData = useCallback(async (assets: string[]) => {
    const [quote, base] = await dbApi("lookup_asset_symbols", [assets]);
    return { base, quote };
  }, []);

  return {
    getPairData,
  };
}
