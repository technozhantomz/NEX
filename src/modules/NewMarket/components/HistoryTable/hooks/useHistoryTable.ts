import { useCallback } from "react";

import { TradeHistoryRow } from "../../../types";

type UseHistoryTableResult = {
  defineTableRowClassName: (record: any) => "buy" | "sell";
};

export function useHistoryTable(): UseHistoryTableResult {
  const defineTableRowClassName = useCallback((record: any) => {
    const item = record as TradeHistoryRow;
    return item.isBuyOrder ? "buy" : "sell";
  }, []);
  return {
    defineTableRowClassName,
  };
}
