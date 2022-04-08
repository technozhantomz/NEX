import { useCallback, useEffect, useState } from "react";

import { roundNum, useAsset, useFormDate } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

import {
  OrderHistory,
  OrderHistoryRow,
  UseHistoryResult,
} from "./useHistory.types";

export function useHistory(): UseHistoryResult {
  const { historyApi } = usePeerplaysApiContext();
  const { currentBase, currentQuote } = usePairSelect();
  const [orderHistoryRow, setOrderHistoryRow] = useState<OrderHistoryRow[]>([]);
  const { setPrecision } = useAsset();

  const getHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      const history: OrderHistory[] = await historyApi(
        "get_fill_order_history",
        [base.id, quote.id, 100]
      );
      setOrderHistoryRow(
        history.map((h) => {
          const time = useFormDate(h.time, ["date", "month", "year", "time"]);
          const { pays, receives } = h.op;
          let baseAmount = 0,
            quoteAmount = 0,
            isBuyOrder = false;
          // this is sell orders
          if (pays.asset_id === base.id) {
            baseAmount = setPrecision(false, pays.amount, base.precision);
            quoteAmount = setPrecision(false, receives.amount, quote.precision);
            isBuyOrder = false;
            //this is buy orders
          } else {
            baseAmount = setPrecision(false, receives.amount, base.precision);
            quoteAmount = setPrecision(false, pays.amount, quote.precision);
            isBuyOrder = true;
          }

          return {
            baseAmount,
            quoteAmount,
            price: roundNum(baseAmount / quoteAmount),
            isBuyOrder,
            time,
          };
        })
      );
    },
    [historyApi]
  );

  useEffect(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getHistory(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getHistory]);

  return {
    orderHistoryRow,
  };
}
