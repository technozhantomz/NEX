import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useAccountHistory,
  useAsset,
  useFormDate,
  useMarketPairStats,
  useOrderBook,
  useUpdateExchanges,
} from "../../../../../common/hooks";
import {
  useChainStoreContext,
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import {
  Asset,
  BlockHeader,
  Exchanges,
  History,
  LimitOrder,
  PairNameAndMarketStats,
} from "../../../../../common/types";
import { Form } from "../../../../../ui/src";
import {
  Order,
  OrderForm,
  OrderHistory,
  OrderHistoryRow,
  OrderRow,
} from "../../../types";

import { UseMarketPageResult } from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { historyApi, dbApi } = usePeerplaysApiContext();
  const { exchanges, updateExchanges } = useUpdateExchanges();
  const { setPrecision, ceilPrecision, getAssetsBySymbols } = useAsset();
  const { getFullAccount } = useAccount();
  const { id, localStorageAccount } = useUserContext();
  const { getAccountHistoryById } = useAccountHistory();
  const { getDefaultPairs, formPairStats } = useMarketPairStats();
  const { formLocalDate } = useFormDate();
  const { synced } = useChainStoreContext();
  const [buyOrderForm] = Form.useForm<OrderForm>();
  const [sellOrderForm] = Form.useForm<OrderForm>();
  const { getOrderBook } = useOrderBook();

  const [previousPair, setPreviousPair] = useState<string>(exchanges.active);
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
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  const handleClickOnPair = useCallback(() => {
    setIsPairModalVisible(true);
  }, [setIsPairModalVisible]);

  const getPairAssets = useCallback(
    async (assets: string[]) => {
      try {
        setLoadingSelectedPair(true);
        const quoteBase = await getAssetsBySymbols(assets);
        const quote = quoteBase[0];
        const base = quoteBase[1];
        setCurrentBase(base as Asset);
        setCurrentQuote(quote as Asset);
        setLoadingSelectedPair(false);
      } catch (e) {
        setLoadingSelectedPair(false);
        console.log(e);
      }
    },
    [
      setCurrentBase,
      setCurrentQuote,
      setLoadingSelectedPair,
      getAssetsBySymbols,
    ]
  );

  const getTradingPairsStats = useCallback(
    async (exchanges: Exchanges) => {
      try {
        setLoadingTradingPairs(true);
        const initPairs: string[] =
          exchanges.list.length > 0 ? exchanges.list : await getDefaultPairs();
        const tradingPairsStats = await Promise.all(
          initPairs.map(formPairStats)
        );
        setTradingPairsStats(tradingPairsStats);
        setLoadingTradingPairs(false);
        if (!pageLoaded) {
          setPageLoaded(true);
        }
      } catch (e) {
        console.log(e);
        setLoadingTradingPairs(false);
      }
    },
    [
      setLoadingTradingPairs,
      getDefaultPairs,
      setTradingPairsStats,
      formPairStats,
      pageLoaded,
      setPageLoaded,
    ]
  );

  const setOrders = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingOrderRows(true);
        const { asks, bids } = await getOrderBook(base, quote);
        setAsks(
          asks.map((ask) => {
            return { ...ask, isBuyOrder: false };
          }) as Order[]
        );
        setBids(
          bids.map((bid) => {
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
      let price: string,
        base: string,
        quote: string,
        isBuyOrder = false;
      const key = limitOrder.id;
      const expiration = formLocalDate(limitOrder.expiration);
      if (baseAsset.id === limitOrder.sell_price.base.asset_id) {
        base = String(
          setPrecision(false, limitOrder.for_sale, baseAsset.precision)
        );
        price = ceilPrecision(
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

        quote = String(
          setPrecision(
            false,
            limitOrder.sell_price.quote.amount,
            quoteAsset.precision
          )
        );
        isBuyOrder = true;
      } else {
        quote = String(
          setPrecision(false, limitOrder.for_sale, quoteAsset.precision)
        );
        price = ceilPrecision(
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
        base = String(
          setPrecision(
            false,
            limitOrder.sell_price.quote.amount,
            baseAsset.precision
          )
        );
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
    [setPrecision, ceilPrecision]
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

  const refreshOrderBook = useCallback(
    async (currentBase: Asset, currentQuote: Asset) => {
      await setOrders(currentBase, currentQuote);
      await getUserOrderBook(currentBase, currentQuote);
    },
    [setOrders, getUserOrderBook]
  );

  const formOrderHistoryRow = useCallback(
    (history: OrderHistory, base: Asset, quote: Asset): OrderHistoryRow => {
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
      // this is buy orders
      if (pays.asset_id === base.id) {
        baseAmount = setPrecision(false, pays.amount, base.precision);
        quoteAmount = setPrecision(false, receives.amount, quote.precision);
        isBuyOrder = true;
        //this is sell orders
      } else {
        baseAmount = setPrecision(false, receives.amount, base.precision);
        quoteAmount = setPrecision(false, pays.amount, quote.precision);
      }

      return {
        key: history.id,
        price: ceilPrecision(baseAmount / quoteAmount),
        base: baseAmount,
        quote: quoteAmount,
        date: time,
        isBuyOrder,
      } as OrderHistoryRow;
    },
    [setPrecision, formLocalDate, ceilPrecision]
  );

  const getHistory = useCallback(
    async (base: Asset, quote: Asset) => {
      try {
        setLoadingOrderHistoryRows(true);
        const histories: OrderHistory[] = await historyApi(
          "get_fill_order_history",
          [base.id, quote.id, 100]
        );

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
        setOrderHistoryRows(
          marketTakersHistories.map((history) => {
            return formOrderHistoryRow(history, base, quote);
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
      setLoadingOrderHistoryRows,
      formOrderHistoryRow,
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
      const date = formLocalDate(blockHeader.timestamp);
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

      return { key, price, base, quote, date, isBuyOrder };
    },
    [dbApi, setPrecision, ceilPrecision]
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
                return formUserHistoryRow(
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

  const refreshHistory = useCallback(
    async (currentBase: Asset, currentQuote: Asset) => {
      await getHistory(currentBase, currentQuote);
      await getUserHistory(currentBase, currentQuote);
    },
    [getHistory, getUserHistory]
  );

  const onOrderBookRowClick = useCallback(
    (record: OrderRow) => {
      if (!record.isBuyOrder) {
        buyOrderForm.setFieldsValue({
          price: record.price,
          quantity: record.quote,
          total: record.base,
        });
      } else {
        sellOrderForm.setFieldsValue({
          price: record.price,
          quantity: record.quote,
          total: record.base,
        });
      }
    },
    [buyOrderForm, sellOrderForm]
  );

  const unsubscribeFromMarket = useCallback(async () => {
    const previousBaseSymbol = previousPair.split("_")[1];
    const previousQuoteSymbol = previousPair.split("_")[0];
    try {
      await dbApi("unsubscribe_from_market", [
        () => {
          console.log("unsubscribing");
        },
        previousBaseSymbol,
        previousQuoteSymbol,
      ]);
    } catch (e) {
      console.log(e);
    }
  }, [previousPair, dbApi]);

  const subscribeToMarket = useCallback(async () => {
    if (currentBase && currentQuote && synced) {
      try {
        await Promise.all([
          getTradingPairsStats(exchanges),
          refreshOrderBook(currentBase, currentQuote),
          refreshHistory(currentBase, currentQuote),
        ]);
        await dbApi("subscribe_to_market", [
          async () => {
            try {
              await Promise.all([
                getTradingPairsStats(exchanges),
                refreshOrderBook(currentBase, currentQuote),
                refreshHistory(currentBase, currentQuote),
              ]);
            } catch (e) {
              console.log(e);
            }
          },
          currentBase.symbol,
          currentQuote.symbol,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [
    currentBase,
    currentQuote,
    getTradingPairsStats,
    exchanges,
    refreshOrderBook,
    refreshHistory,
    dbApi,
    synced,
  ]);

  useEffect(() => {
    if (currentPair !== exchanges.active) {
      setPreviousPair(exchanges.active);
      updateExchanges(currentPair);
    }
    // this one update currentBase and currentQuote
    getPairAssets(currentPair.split("_"));
  }, [currentPair, getPairAssets, updateExchanges, setPreviousPair]);

  useEffect(() => {
    subscribeToMarket();
    return () => {
      unsubscribeFromMarket();
    };
  }, [currentBase, currentQuote, id]);

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
    asks,
    bids,
    ordersRows,
    setOrdersRows,
    loadingOrderRows,
    userOrdersRows,
    loadingUserOrderRows,
    orderHistoryRows,
    loadingOrderHistoryRows,
    userOrderHistoryRows,
    loadingUserHistoryRows,
    buyOrderForm,
    sellOrderForm,
    onOrderBookRowClick,
    pageLoaded,
  };
}
