import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { History } from "../../types";

import { UseAccountHistoryResult } from "./useAccountHistory.types";

export function useAccountHistory(): UseAccountHistoryResult {
  const { historyApi } = usePeerplaysApiContext();

  const getAccountHistoryById = useCallback(
    async (id: string) => {
      const history = await historyApi("get_account_history", [
        id,
        "1.11.0",
        100,
        "1.11.9999999999",
      ]);
      return history as History[];
    },
    [historyApi]
  );

  return {
    getAccountHistoryById,
  };
}
