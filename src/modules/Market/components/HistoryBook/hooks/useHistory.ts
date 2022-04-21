import { useCallback, useEffect, useState } from "react";

import { roundNum, useAsset, useFormDate } from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import {
  OrderHistory,
  OrderHistoryColumn,
  OrderHistoryRow,
  UseHistoryResult,
} from "./useHistory.types";

type Args = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
};

export function useHistory({
  currentBase,
  currentQuote,
  loadingSelectedPair,
}: Args): UseHistoryResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();

  const [orderHistoryRows, setOrderHistoryRows] = useState<OrderHistoryRow[]>(
    []
  );
  const [userOrderHistoryRows, setUserOrderHistoryRows] = useState<
    OrderHistoryRow[]
  >([]);
  const [loadingOrderHistoryRows, setLoadingOrderHistoryRows] =
    useState<boolean>(true);
  const [columns, setColumns] = useState<OrderHistoryColumn[]>([]);
  const { id } = useUserContext();
  const { setPrecision } = useAsset();

  const getHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingOrderHistoryRows(true);
        const history: OrderHistory[] = await historyApi(
          "get_fill_order_history",
          [base.id, quote.id, 100]
        );
        setOrderHistoryRows(
          history.map((h) => {
            const time = useFormDate(h.time, ["month", "year", "time"]);
            const { pays, receives } = h.op;
            let baseAmount = 0,
              quoteAmount = 0,
              isBuyOrder = false;
            // this is sell orders
            if (pays.asset_id === base.id) {
              baseAmount = setPrecision(false, pays.amount, base.precision);
              quoteAmount = setPrecision(
                false,
                receives.amount,
                quote.precision
              );
              isBuyOrder = false;
              //this is buy orders
            } else {
              baseAmount = setPrecision(false, receives.amount, base.precision);
              quoteAmount = setPrecision(false, pays.amount, quote.precision);
              isBuyOrder = true;
            }

            return {
              price: roundNum(baseAmount / quoteAmount),
              base: baseAmount,
              quote: quoteAmount,
              date: time,
              isBuyOrder,
            };
          })
        );
        setLoadingOrderHistoryRows(false);
      } catch (e) {
        console.log(e);
        setLoadingOrderHistoryRows(false);
      }
    },
    [
      historyApi,
      setOrderHistoryRows,
      useFormDate,
      setPrecision,
      roundNum,
      setLoadingOrderHistoryRows,
    ]
  );

  const getUserHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      const baseAsset = base;
      const quoteAsset = quote;
      let history = await historyApi("get_account_history", [
        id,
        "1.11.0",
        100,
        "1.11.9999999999",
      ]).then((history) => history.filter((el) => el.op[0] === 4));
      history = history.filter((e) => {
        if (e.op[0] === 4) {
          const pays = e.op[1].pays;
          const receives = e.op[1].receives;
          const orderAssets = [pays.asset_id, receives.asset_id];
          return (
            orderAssets.includes(baseAsset.id) &&
            orderAssets.includes(quoteAsset.id)
          );
        }
      });
      const rows = await Promise.all(
        history.map(async (item) => {
          const date = await dbApi("get_block_header", [item.block_num]).then(
            (block) => useFormDate(block.timestamp, ["month", "year", "time"])
          );
          const opData = item.op[1];
          const key = item.id;

          let price = 0,
            base = 0,
            quote = 0,
            isBuyOrder = false;

          if (opData.receives.asset_id === quoteAsset.id) {
            quote = setPrecision(
              false,
              opData.receives.amount,
              quoteAsset.precision
            );
            base = setPrecision(false, opData.pays.amount, baseAsset.precision);
            price = roundNum(base / quote);
            isBuyOrder = true;
          } else {
            quote = setPrecision(
              false,
              opData.pays.amount,
              quoteAsset.precision
            );
            base = setPrecision(
              false,
              opData.receives.amount,
              baseAsset.precision
            );
            price = roundNum(base / quote);
            isBuyOrder = false;
          }

          return { key, price, base, quote, date, isBuyOrder };
        })
      );
      setUserOrderHistoryRows(rows);
    },
    [historyApi]
  );

  const refreshHistory = useCallback(() => {
    if (currentBase !== undefined && currentQuote !== undefined) {
      getHistory(currentBase, currentQuote);
      getUserHistory(currentBase, currentQuote);
    }
  }, [currentBase, currentQuote, getHistory, getUserHistory]);

  useEffect(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      setColumns([
        {
          title: currentBase.symbol,
          dataIndex: "base",
          key: "base",
        },
        {
          title: currentQuote.symbol,
          dataIndex: "quote",
          key: "quote",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
      ]);
      getHistory(currentBase, currentQuote);
      //getUserHistory(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getHistory,
    //getUserHistory,
  ]);

  return {
    orderHistoryRows,
    userOrderHistoryRows,
    columns,
    refreshHistory,
    loadingOrderHistoryRows,
  };
}
