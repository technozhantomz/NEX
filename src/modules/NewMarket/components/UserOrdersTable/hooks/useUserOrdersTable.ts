import counterpart from "counterpart";
import { useCallback } from "react";

type UseUserOrdersTableResult = {
  defineTableRowClassName: (record: any) => "buy" | "sell";
};

export function useUserOrdersTable(): UseUserOrdersTableResult {
  const defineTableRowClassName = useCallback((record: any) => {
    return record.side === counterpart.translate("pages.profile.orders_tab.buy")
      ? "buy"
      : "sell";
  }, []);
  return {
    defineTableRowClassName,
  };
}
