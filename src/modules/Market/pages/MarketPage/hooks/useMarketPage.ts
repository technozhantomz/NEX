import { useCallback, useEffect, useState } from "react";

import {
  roundNum,
  useAccount,
  useAccountHistory,
  useAsset,
  useFormDate,
  useMarketPairStats,
  useUpdateExchanges,
} from "../../../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import {
  Asset,
  BlockHeader,
  History,
  LimitOrder,
} from "../../../../../common/types";
import { Order, OrderHistory, OrderHistoryRow, OrderRow } from "../../../types";

import {
  PairNameAndMarketStats,
  UseMarketPageResult,
} from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();
  const { exchanges, updateExchanges } = useUpdateExchanges();
  const { getMarketPairStats } = useMarketPairStats();
  const { getAssetBySymbol, defaultAsset, setPrecision } = useAsset();
  const { getFullAccount } = useAccount();
  const { id, localStorageAccount } = useUserContext();
  const { getAccountHistoryById } = useAccountHistory();

  const [tradingPairsStats, setTradingPairsStats] = useState<
    PairNameAndMarketStats[]
  >([]);
  const [loadingTradingPairs, setLoadingTradingPairs] = useState<boolean>(true);
  const [currentBase, setCurrentBase] = useState<Asset>();
  const [currentQuote, setCurrentQuote] = useState<Asset>();
  const [loadingSelectedPair, setLoadingSelectedPair] = useState<boolean>(true);
  const [isPairModalVisible, setIsPairModalVisible] = useState<boolean>(false);
  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [ordersRows, setOrdersRows] = useState<OrderRow[]>([]);
  const [loadingOrderRows, setLoadingOrderRows] = useState<boolean>(true);
  const [userOrdersRows, setUserOrdersRows] = useState<OrderRow[]>([]);
  const [loadingUserOrderRows, setLoadingUserOrderRows] =
    useState<boolean>(true);
  const [orderHistoryRows, setOrderHistoryRows] = useState<OrderHistoryRow[]>(
    []
  );
  const [loadingOrderHistoryRows, setLoadingOrderHistoryRows] =
    useState<boolean>(true);
  const [userOrderHistoryRows, setUserOrderHistoryRows] = useState<
    OrderHistoryRow[]
  >([]);

  const [loadingUserHistoryRows, setLoadingUserHistoryRows] =
    useState<boolean>(true);

  const handleClickOnPair = useCallback(() => {
    setIsPairModalVisible(true);
  }, [setIsPairModalVisible]);

  const getPairAssets = useCallback(
    async (assets: string[]) => {
      try {
        setLoadingSelectedPair(true);
        const [quote, base] = await dbApi("lookup_asset_symbols", [assets]);
        setCurrentBase(base as Asset);
        setCurrentQuote(quote as Asset);
        setLoadingSelectedPair(false);
      } catch (e) {
        setLoadingSelectedPair(false);
        console.log(e);
      }
    },
    [dbApi, setCurrentBase, setCurrentQuote, setLoadingSelectedPair]
  );

  const formPairStats = useCallback(
    async (pair: string): Promise<PairNameAndMarketStats> => {
      const quoteSymbol = pair.split("/")[0].trim();
      const baseSymbol = pair.split("/")[1].trim();
      const quote = await getAssetBySymbol(quoteSymbol);
      const base = await getAssetBySymbol(baseSymbol);
      if (base && quote) {
        const marketPairStats = await getMarketPairStats(base, quote);
        return {
          tradingPair: pair,
          marketPairStats,
        } as PairNameAndMarketStats;
      } else {
        return {
          tradingPair: pair,
          marketPairStats: {
            volume: 0,
            latest: 0,
            percentChange: 0,
          },
        } as PairNameAndMarketStats;
      }
    },
    [getAssetBySymbol, getMarketPairStats]
  );

  const getTradingPairsStats = useCallback(
    async (defaultAsset, exchanges) => {
      try {
        setLoadingTradingPairs(true);
        const initPairs: string[] =
          exchanges.list.length > 0
            ? exchanges.list
            : [
                `BTC/${defaultAsset.symbol}`,
                `HIVE/${defaultAsset.symbol}`,
                `HBD/${defaultAsset.symbol}`,
                `LARNYX/${defaultAsset.symbol}`,
              ];
        const tradingPairsStats = await Promise.all(
          initPairs.map(formPairStats)
        );
        setTradingPairsStats(tradingPairsStats);
        setLoadingTradingPairs(false);
      } catch (e) {
        console.log(e);
        setLoadingTradingPairs(false);
      }
    },
    [setTradingPairsStats, formPairStats, setLoadingTradingPairs]
  );

  const getOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingOrderRows(true);
        const { asks, bids } = await dbApi("get_order_book", [
          base.symbol,
          quote.symbol,
          50,
        ]);
        setAsks(
          asks.map((ask: Order) => {
            return { ...ask, isBuyOrder: false };
          }) as Order[]
        );
        setBids(
          bids.map((bid: Order) => {
            return { ...bid, isBuyOrder: true };
          }) as Order[]
        );
        setLoadingOrderRows(false);
      } catch (e) {
        console.log(e);
        setAsks([]);
        setBids([]);
        setLoadingOrderRows(false);
      }
    },
    [dbApi, setAsks, setBids, setLoadingOrderRows]
  );

  const formUserOrderRow = useCallback(
    (baseAsset: Asset, quoteAsset: Asset, limitOrder: LimitOrder): OrderRow => {
      let price = 0,
        base = 0,
        quote = 0,
        isBuyOrder = false;
      const key = limitOrder.id;
      const expiration = useFormDate(limitOrder.expiration);
      if (baseAsset.id === limitOrder.sell_price.base.asset_id) {
        base = setPrecision(false, limitOrder.for_sale, baseAsset.precision);
        price = roundNum(
          setPrecision(
            false,
            limitOrder.sell_price.base.amount,
            baseAsset.precision
          ) /
            setPrecision(
              false,
              limitOrder.sell_price.quote.amount,
              quoteAsset.precision
            ),
          baseAsset.precision
        );

        quote = roundNum(base / price, quoteAsset.precision);
        isBuyOrder = true;
      } else {
        quote = setPrecision(false, limitOrder.for_sale, quoteAsset.precision);
        price = roundNum(
          setPrecision(
            false,
            limitOrder.sell_price.quote.amount,
            baseAsset.precision
          ) /
            setPrecision(
              false,
              limitOrder.sell_price.base.amount,
              quoteAsset.precision
            ),
          baseAsset.precision
        );
        base = roundNum(price * quote, baseAsset.precision);
        isBuyOrder = false;
      }

      return {
        key,
        base,
        quote,
        price,
        isBuyOrder,
        expiration,
      } as OrderRow;
    },
    [setPrecision, roundNum, useFormDate]
  );

  const getUserOrderBook = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingUserOrderRows(true);
        const fullAccount = await getFullAccount(localStorageAccount, false);
        if (fullAccount !== undefined) {
          const limitOrders = fullAccount.limit_orders;
          const limitOrdersForThePair = limitOrders.filter((limitOrder) => {
            const orderAssetsIds = [
              limitOrder.sell_price.base.asset_id,
              limitOrder.sell_price.quote.asset_id,
            ];
            return (
              orderAssetsIds.includes(base.id) &&
              orderAssetsIds.includes(quote.id)
            );
          });
          const userOrderRows = limitOrdersForThePair.map((limitOrder) => {
            return formUserOrderRow(base, quote, limitOrder);
          });
          setUserOrdersRows(userOrderRows);
          setLoadingUserOrderRows(false);
        } else {
          setUserOrdersRows([]);
          setLoadingUserOrderRows(false);
        }
      } catch (e) {
        console.log(e);
        setLoadingUserOrderRows(false);
      }
    },
    [
      getFullAccount,
      formUserOrderRow,
      setUserOrdersRows,
      setLoadingUserOrderRows,
    ]
  );

  const refreshOrderBook = useCallback(() => {
    if (
      !loadingSelectedPair &&
      currentBase !== undefined &&
      currentQuote !== undefined
    ) {
      getOrderBook(currentBase, currentQuote);
      getUserOrderBook(currentBase, currentQuote);
    }
  }, [
    loadingSelectedPair,
    currentBase,
    currentQuote,
    getOrderBook,
    getUserOrderBook,
  ]);

  const formOrderHistoryRow = useCallback(
    (history: OrderHistory, base: Asset, quote: Asset): OrderHistoryRow => {
      const time = useFormDate(history.time, ["month", "year", "time"]);
      const { pays, receives } = history.op;
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
        key: history.id,
        price: roundNum(baseAmount / quoteAmount),
        base: baseAmount,
        quote: quoteAmount,
        date: time,
        isBuyOrder,
      } as OrderHistoryRow;
    },
    [useFormDate, setPrecision, roundNum]
  );

  const getHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingOrderHistoryRows(true);
        const histories: OrderHistory[] = await historyApi(
          "get_fill_order_history",
          [base.id, quote.id, 100]
        );
        setOrderHistoryRows(
          histories.map((history) => {
            return formOrderHistoryRow(history, base, quote);
          })
        );
        setLoadingOrderHistoryRows(false);
      } catch (e) {
        console.log(e);
        setLoadingOrderHistoryRows(false);
      }
    },
    [historyApi, setOrderHistoryRows, setLoadingOrderHistoryRows]
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
      } else {
        setUserOrderHistoryRows([]);
        setLoadingUserHistoryRows(false);
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
    if (currentPair !== exchanges.active) {
      updateExchanges(currentPair);
    }
    getPairAssets(currentPair.split("_"));
  }, [currentPair, getPairAssets, updateExchanges]);

  useEffect(() => {
    if (defaultAsset && exchanges) {
      getTradingPairsStats(defaultAsset, exchanges);
    }
  }, [defaultAsset, exchanges.list]);

  return {
    tradingPairsStats,
    loadingTradingPairs,
    currentBase,
    currentQuote,
    loadingSelectedPair,
    isPairModalVisible,
    setIsPairModalVisible,
    handleClickOnPair,
    exchanges,
    getOrderBook,
    asks,
    bids,
    ordersRows,
    setOrdersRows,
    loadingOrderRows,
    getUserOrderBook,
    userOrdersRows,
    loadingUserOrderRows,
    refreshOrderBook,
    getHistory,
    orderHistoryRows,
    loadingOrderHistoryRows,
    getUserHistory,
    userOrderHistoryRows,
    loadingUserHistoryRows,
    refreshHistory,
  };
}
