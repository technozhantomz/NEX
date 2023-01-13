import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  useAccount,
  useAccountHistory,
  useAsset,
  useBlockchain,
  useFormDate,
  useMarketHistory,
} from "../../../../../common/hooks";
import {
  useMarketContext,
  useUserContext,
} from "../../../../../common/providers";
import {
  Asset,
  History,
  LimitOrder,
  OrderHistory,
} from "../../../../../common/types";
import { OrderHistoryRow } from "../../../../Market/types";
import { TradeHistoryColumn, TradeHistoryRow } from "../../../types";

import { UseHistoryTableResult } from "./useHistoryTable.types";

type Props = {
  forUser?: boolean;
};

export function useHistoryTable({
  forUser = false,
}: Props): UseHistoryTableResult {
  const { selectedPair } = useMarketContext();
  const { id, localStorageAccount } = useUserContext();
  const { getBlockHeader } = useBlockchain();
  const { getAccountHistoryById } = useAccountHistory();
  const { setPrecision, ceilPrecision } = useAsset();
  const { getFillOrderHistory } = useMarketHistory();
  const { getFullAccount } = useAccount();
  const { formLocalDate } = useFormDate();
  const [tradeHistoryRows, setTradeHistoryRows] = useState<TradeHistoryRow[]>(
    []
  );
  const [userOrderHistoryRows, setUserOrderHistoryRows] = useState<
    OrderHistoryRow[]
  >([]);
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

  const formUserHistoryRow = useCallback(
    async (
      baseAsset: Asset,
      quoteAsset: Asset,
      history: History,
      openOrder?: LimitOrder
    ): Promise<OrderHistoryRow> => {
      const blockHeader = await getBlockHeader(history.block_num);
      const date = blockHeader
        ? formLocalDate(blockHeader.timestamp, [
            "month",
            "date",
            "year",
            "time",
          ])
        : "";
      const operationDetails = history.op[1];
      const key = history.id;

      let price = "0",
        base = 0,
        quote = 0,
        isBuyOrder = false;

      if (operationDetails.receives.asset_id === quoteAsset.id) {
        quote = setPrecision(
          false,
          operationDetails.receives.amount,
          quoteAsset.precision
        );
        base = setPrecision(
          false,
          operationDetails.pays.amount,
          baseAsset.precision
        );
        price = ceilPrecision(base / quote, baseAsset.precision);
        isBuyOrder = true;
      } else {
        quote = setPrecision(
          false,
          operationDetails.pays.amount,
          quoteAsset.precision
        );
        base = setPrecision(
          false,
          operationDetails.receives.amount,
          baseAsset.precision
        );
        price = ceilPrecision(base / quote, baseAsset.precision);
      }
      let numberdFilled = 100;
      let filled = "";
      if (openOrder) {
        numberdFilled =
          (operationDetails.pays.amount / openOrder.sell_price.base.amount) *
          100;
        filled = `${numberdFilled.toFixed(1)}%`;
      } else {
        filled = "100%";
      }

      return { key, price, base, quote, date, isBuyOrder, filled };
    },
    [getBlockHeader, formLocalDate, setPrecision, ceilPrecision]
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
            return formTradeHistoryRow(
              history,
              selectedPair.base,
              selectedPair.quote
            );
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

  const getUserHistory = useCallback(async () => {
    if (selectedPair && id && id !== "") {
      try {
        setLoadingTradeHistory(true);
        const [fullAccount, userOperationsHistory] = await Promise.all([
          getFullAccount(localStorageAccount, false),
          getAccountHistoryById(id),
        ]);
        let limitOrders: LimitOrder[] = [];
        if (fullAccount) {
          limitOrders = fullAccount.limit_orders;
        }
        //const userOperationsHistory = await getAccountHistoryById(id);
        const fillOrdersHistory = userOperationsHistory.filter(
          (userOperationHistory) => userOperationHistory.op[0] === 4
        );
        const fillOrdersHistoryForThePair = fillOrdersHistory.filter(
          (fillOrderHistory) => {
            const pays = fillOrderHistory.op[1].pays;
            const receives = fillOrderHistory.op[1].receives;
            const orderAssetsIds = [pays.asset_id, receives.asset_id];
            return (
              orderAssetsIds.includes(selectedPair.base.id) &&
              orderAssetsIds.includes(selectedPair.quote.id)
            );
          }
        );
        const userHistoryRows = await Promise.all(
          fillOrdersHistoryForThePair.map(
            async (fillOrderHistoryForThePair) => {
              const operationDetails = fillOrderHistoryForThePair.op[1];
              return formUserHistoryRow(
                selectedPair.base,
                selectedPair.quote,
                fillOrderHistoryForThePair,
                limitOrders.find(
                  (order) => order.id === operationDetails.order_id
                )
              );
            }
          )
        );
        setUserOrderHistoryRows(userHistoryRows);
        setLoadingTradeHistory(false);
      } catch (e) {
        console.log(e);
        setLoadingTradeHistory(false);
      }
    } else {
      setTradeHistoryRows([]);
      setLoadingTradeHistory(false);
    }
  }, [
    selectedPair,
    id,
    localStorageAccount,
    getFullAccount,
    setLoadingTradeHistory,
    getAccountHistoryById,
    formUserHistoryRow,
    setUserOrderHistoryRows,
  ]);

  useEffect(() => {
    forUser ? getUserHistory() : getHistory();
  }, [selectedPair]);

  return {
    tradeHistoryRows,
    userOrderHistoryRows,
    tradeHistoryColumns,
    loadingTradeHistory,
  };
}
