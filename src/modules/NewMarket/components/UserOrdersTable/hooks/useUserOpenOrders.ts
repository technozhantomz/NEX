import counterpart from "counterpart";
import { useCallback } from "react";

type UseUserOpenOrdersResult = {
  defineTableRowClassName: (record: any) => "buy" | "sell";
};

export function useUserOpenOrders(): UseUserOpenOrdersResult {
  const defineTableRowClassName = useCallback((record: any) => {
    return record.side === counterpart.translate("pages.profile.orders_tab.buy")
      ? "buy"
      : "sell";
  }, []);
  return {
    defineTableRowClassName,
  };
}
