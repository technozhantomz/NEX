import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApi } from "../../../../../common/components/peerplaysApi";
import { useAsset } from "../../../../../common/hooks/useAsset";
import { useFormDate } from "../../../../../common/hooks/useFormDate";
import { roundNum } from "../../../../../common/hooks/useRoundNum";
import { Asset } from "../../../../../common/types/Asset";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

import {
  OrderHistory,
  OrderHistoryColumn,
  OrderHistoryRow,
  UseHistoryResult,
} from "./useHistory.types";

export function useHistory(): UseHistoryResult {
  const { historyApi } = usePeerplaysApi();
  const { currentBase, currentQuote } = usePairSelect();
  const [orderHistoryRow, setOrderHistoryRow] = useState<OrderHistoryRow[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [columns, setColumns] = useState<OrderHistoryColumn[]>([]);
  const { setPrecision } = useAsset();

  const getHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      const history: OrderHistory[] = await historyApi(
        "get_fill_order_history",
        [base.id, quote.id, 100]
      );
      setColumns([
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: quote.symbol,
          dataIndex: "baseAmount",
          key: "baseAmount",
        },
        {
          title: base.symbol,
          dataIndex: "quoteAmount",
          key: "quoteAmount",
        },
        {
          title: "Date",
          dataIndex: "time",
          key: "time",
        },
      ]);
      setOrderHistoryRow(
        history.map((h, index) => {
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
            key: String(index),
            baseAmount,
            quoteAmount,
            price: roundNum(baseAmount / quoteAmount, base.precision),
            isBuyOrder,
            time,
          };
        })
      );
      setTableLoading(false);
    },
    [historyApi, setColumns, setOrderHistoryRow, setTableLoading]
  );

  useEffect(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getHistory(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getHistory]);

  return {
    tableLoading,
    orderHistoryRow,
    columns,
  };
}
