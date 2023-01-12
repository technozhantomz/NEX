import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useAsset,
  useFormDate,
  useMarketHistory,
} from "../../../../../common/hooks";
import { useMarketContext } from "../../../../../common/providers";
import { Asset, OrderHistory } from "../../../../../common/types";
import { TradeHistoryColumn, TradeHistoryRow } from "../../../types";

import { UseHistoryTableResult } from "./useHistoryTable.types";

type Props = {
  forUser?: boolean;
};

export function useHistoryTable({
  forUser = false,
}: Props): UseHistoryTableResult {
  const { selectedPair } = useMarketContext();
  const { setPrecision, ceilPrecision } = useAsset();
  const { getFillOrderHistory } = useMarketHistory();
  const { formLocalDate } = useFormDate();
  const [tradeHistoryRows, setTradeHistoryRows] = useState<TradeHistoryRow[]>(
    []
  );
  const [loadingTradeHistory, setLoadingTradeHistory] = useState<boolean>(true);

  const tradeHistoryColumns: TradeHistoryColumn[] = useMemo(() => {
    if (selectedPair) {
      return [
        {
          title: `${counterpart.translate("tableHead.price")} (${
            selectedPair.quote.symbol
          })`,
          dataIndex: "price",
          key: "price",
          fixed: true,
        },
        {
          title: `${counterpart.translate("tableHead.amount")} (${
            selectedPair.base.symbol
          })`,
          dataIndex: "amount",
          key: "amount",
          fixed: true,
        },
        {
          title: counterpart.translate(`tableHead.time`),
          dataIndex: "time",
          key: "time",
          fixed: true,
        },
      ];
    } else {
      return [];
    }
  }, [selectedPair]);

  const formTradeHistoryRow = useCallback(
    (history: OrderHistory, base: Asset, quote: Asset): TradeHistoryRow => {
      const time = formLocalDate(history.time, [
        "month",
        "date",
        "year",
        "time",
      ]);
      const { pays, receives } = history.op;
      let baseAmount = 0,
        quoteAmount = 0,
        isBuyOrder = false;
      // this is sell orders
      if (pays.asset_id === base.id) {
        baseAmount = setPrecision(false, pays.amount, base.precision);
        quoteAmount = setPrecision(false, receives.amount, quote.precision);
        //this is buy orders
      } else {
        baseAmount = setPrecision(false, receives.amount, base.precision);
        quoteAmount = setPrecision(false, pays.amount, quote.precision);
        isBuyOrder = true;
      }

      return {
        key: history.id,
        price: ceilPrecision(quoteAmount / baseAmount),
        amount: baseAmount,
        time: time,
        isBuyOrder,
      } as TradeHistoryRow;
    },
    [setPrecision, formLocalDate, ceilPrecision]
  );

  const getHistory = useCallback(async () => {
    if (selectedPair) {
      const base = selectedPair.base;
      const quote = selectedPair.quote;
      try {
        setLoadingTradeHistory(true);
        const histories = await getFillOrderHistory(base, quote);
        if (histories) {
          const marketTakersHistories = histories.reduce(
            (previousHistory, currentHistory, i, { [i - 1]: next }) => {
              if (i % 2) {
                previousHistory.push(
                  currentHistory.op.order_id > next.op.order_id
                    ? currentHistory
                    : next
                );
              }
              return previousHistory;
            },
            [] as OrderHistory[]
          );
          const tradeHistoryRows = marketTakersHistories.map((history) => {
            return formTradeHistoryRow(history, base, quote);
          });
          setTradeHistoryRows(tradeHistoryRows);
        }
        setLoadingTradeHistory(false);
      } catch (e) {
        console.log(e);
        setLoadingTradeHistory(false);
      }
    }
  }, [
    selectedPair,
    setLoadingTradeHistory,
    getFillOrderHistory,
    formTradeHistoryRow,
    setTradeHistoryRows,
  ]);

  useEffect(() => {
    forUser ? undefined : getHistory();
  }, [selectedPair]);

  return { tradeHistoryRows, tradeHistoryColumns, loadingTradeHistory };
}
