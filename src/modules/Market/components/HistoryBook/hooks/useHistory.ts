import { useCallback, useEffect, useState } from "react";

import {
  roundNum,
  useAccountHistory,
  useAsset,
  useFormDate,
} from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset, BlockHeader, History } from "../../../../../common/types";

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
  const [loadingUserHistoryRows, setLoadingUserHistoryRows] =
    useState<boolean>(true);

  const [columns, setColumns] = useState<OrderHistoryColumn[]>([]);
  const { id } = useUserContext();
  const { setPrecision } = useAsset();
  const { getAccountHistoryById } = useAccountHistory();

  const getHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setOrderHistoryRows([]);
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
              key: h.id,
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

  const formUserHistoryRow = useCallback(
    async (
      baseAsset: Asset,
      quoteAsset: Asset,
      history: History
    ): Promise<OrderHistoryRow> => {
      const blockHeader: BlockHeader = await dbApi("get_block_header", [
        history.block_num,
      ]);
      const date = useFormDate(blockHeader.timestamp);
      const operationDetails = history.op[1];
      const key = history.id;

      let price = 0,
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
        price = roundNum(base / quote, baseAsset.precision);
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
        price = roundNum(base / quote, baseAsset.precision);
        isBuyOrder = false;
      }

      return { key, price, base, quote, date, isBuyOrder };
    },
    [dbApi, useFormDate, setPrecision, roundNum]
  );

  const getUserHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      if (id !== null && id !== "") {
        try {
          setLoadingUserHistoryRows(true);
          setUserOrderHistoryRows([]);
          const userOperationsHistory = await getAccountHistoryById(id);
          const fillOrdersHistory = userOperationsHistory.filter(
            (userOperationHistory) => userOperationHistory.op[0] === 4
          );
          const fillOrdersHistoryForThePair = fillOrdersHistory.filter(
            (fillOrderHistory) => {
              const pays = fillOrderHistory.op[1].pays;
              const receives = fillOrderHistory.op[1].receives;
              const orderAssetsIds = [pays.asset_id, receives.asset_id];
              return (
                orderAssetsIds.includes(base.id) &&
                orderAssetsIds.includes(quote.id)
              );
            }
          );
          const userHistoryRows = await Promise.all(
            fillOrdersHistoryForThePair.map(
              async (fillOrderHistoryForThePair) => {
                return await formUserHistoryRow(
                  base,
                  quote,
                  fillOrderHistoryForThePair
                );
              }
            )
          );
          setUserOrderHistoryRows(userHistoryRows);
          setLoadingUserHistoryRows(false);
        } catch (e) {
          console.log(e);
          setLoadingUserHistoryRows(false);
        }
      }
    },
    [
      getAccountHistoryById,
      formUserHistoryRow,
      setUserOrderHistoryRows,
      id,
      setLoadingUserHistoryRows,
    ]
  );

  const refreshHistory = useCallback(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      getHistory(currentBase, currentQuote);
      getUserHistory(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getHistory,
    getUserHistory,
  ]);

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
      getUserHistory(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getHistory,
    getUserHistory,
  ]);

  return {
    orderHistoryRows,
    userOrderHistoryRows,
    columns,
    refreshHistory,
    loadingOrderHistoryRows,
    loadingUserHistoryRows,
  };
}
