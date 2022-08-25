import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import { History } from "../../types";

import { UseAccountHistoryResult } from "./useAccountHistory.types";

export function useAccountHistory(): UseAccountHistoryResult {
  const { historyApi } = usePeerplaysApiContext();

  const getAccountHistoryById = useCallback(
    async (id: string) => {
      const history = await historyApi("get_relative_account_history", [
        id,
        0, //Sequence number of earliest operation. 0 is default and will query ‘limit’ number of operations.
        100, //Maximum number of operations to retrieve (must not exceed 100)
        0, //Sequence number of the most recent operation to retrieve. 0 is default, which will start querying from the most recent operation.
      ]);
      return history as History[];
    },
    [historyApi]
  );

  return {
    getAccountHistoryById,
  };
}
