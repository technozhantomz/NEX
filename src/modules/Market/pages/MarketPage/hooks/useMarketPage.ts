import { useCallback, useEffect, useState } from "react";

import {
  useAccount,
  useAccountHistory,
  useAsset,
  useBlockchain,
  useFormDate,
  useMarketHistory,
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
  History,
  LimitOrder,
  OrderHistory,
  PairNameAndMarketStats,
} from "../../../../../common/types";
import { Form } from "../../../../../ui/src";
import {
  Order,
  OrderForm,
  OrderHistoryRow,
  OrderRow,
  PairAssets,
} from "../../../types";

import { UseMarketPageResult } from "./useMarketPage.types";

type Props = {
  currentPair: string;
};

// This is in miliseconds
const REQUIRED_TICKER_UPDATE_TIME = 800;

export function useMarketPage({ currentPair }: Props): UseMarketPageResult {
  const { dbApi } = usePeerplaysApiContext();
  const { getBlockHeader } = useBlockchain();
  const { exchanges } = useUpdateExchanges();
  const { setPrecision, ceilPrecision, getAssetsBySymbols } = useAsset();
  const { getFullAccount } = useAccount();
  const { id, localStorageAccount } = useUserContext();
  const { getAccountHistoryById } = useAccountHistory();
  const { getFillOrderHistory } = useMarketHistory();
  const { getDefaultPairs, formPairStats } = useMarketPairStats();
  const { formLocalDate } = useFormDate();
  const { synced } = useChainStoreContext();
  const [buyOrderForm] = Form.useForm<OrderForm>();
  const [sellOrderForm] = Form.useForm<OrderForm>();
  const { getOrderBook } = useOrderBook();

  const [tradingPairsStats, setTradingPairsStats] = useState<
    PairNameAndMarketStats[]
  >([]);
  const [loadingTradingPairsStats, setLoadingTradingPairsStats] =
    useState<boolean>(true);

  const [selectedAssets, setSelectedAssets] = useState<PairAssets>();
  const [loadingSelectedPair, setLoadingSelectedPair] = useState<boolean>(true);

  const [isPairModalVisible, setIsPairModalVisible] = useState<boolean>(false);

  const [asks, setAsks] = useState<Order[]>([]);
  const [bids, setBids] = useState<Order[]>([]);
  const [loadingAsksBids, setLoadingAsksBids] = useState<boolean>(true);

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

  const getPairAssets = useCallback(async () => {
    const assetsSymbols = currentPair.split("_");
    try {
      const quoteBase = await getAssetsBySymbols(assetsSymbols);
      if (quoteBase.length > 1) {
        const quote = quoteBase.find(
          (asset) => asset.symbol === assetsSymbols[0]
        ) as Asset;
        const base = quoteBase.find(
          (asset) => asset.symbol === assetsSymbols[1]
        ) as Asset;
        return { base, quote };
      }
    } catch (e) {
      console.log(e);
    }
  }, [currentPair, getAssetsBySymbols]);

  const getTradingPairsStats = useCallback(async () => {
    try {
      setLoadingTradingPairsStats(true);
      const initPairs: string[] =
        exchanges.list.length > 0 ? exchanges.list : getDefaultPairs();
      const tradingPairsStats = await Promise.all(initPairs.map(formPairStats));
      setTradingPairsStats(tradingPairsStats);
      setLoadingTradingPairsStats(false);
      if (!pageLoaded) {
        setPageLoaded(true);
      }
    } catch (e) {
      console.log(e);
      setLoadingTradingPairsStats(false);
    }
  }, [
    setLoadingTradingPairsStats,
    exchanges,
    getDefaultPairs,
    formPairStats,
    setTradingPairsStats,
    pageLoaded,
    setPageLoaded,
  ]);

  const getAsksBids = useCallback(async () => {
    if (selectedAssets) {
      try {
        setLoadingAsksBids(true);
        const { asks, bids } = await getOrderBook(
          selectedAssets.base,
          selectedAssets.quote
        );
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
        setLoadingAsksBids(false);
      } catch (e) {
        console.log(e);
        setAsks([]);
        setBids([]);
        setLoadingAsksBids(false);
      }
    }
  }, [selectedAssets, setLoadingAsksBids, getOrderBook, setAsks, setBids]);

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
          setPrecision(
            false,
            limitOrder.sell_price.base.amount,
            baseAsset.precision
          )
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
          setPrecision(
            false,
            limitOrder.sell_price.base.amount,
            quoteAsset.precision
          )
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
      const filled = `${(
        ((Number(limitOrder.sell_price.base.amount) -
          Number(limitOrder.for_sale)) /
          Number(limitOrder.sell_price.base.amount)) *
        100
      ).toFixed(1)}%`;
      return {
        key,
        base,
        quote,
        price,
        isBuyOrder,
        expiration,
        filled,
      } as OrderRow;
    },
    [setPrecision, ceilPrecision]
  );
  const getUserOrderBook = useCallback(async () => {
    if (selectedAssets) {
      const base = selectedAssets.base;
      const quote = selectedAssets.quote;
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
    }
  }, [
    selectedAssets,
    setLoadingUserOrderRows,
    getFullAccount,
    localStorageAccount,
    formUserOrderRow,
    setUserOrdersRows,
  ]);

  const refreshOrderBook = useCallback(async () => {
    await getAsksBids();
    await getUserOrderBook();
  }, [getAsksBids, getUserOrderBook]);

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
  const getHistory = useCallback(async () => {
    if (selectedAssets) {
      const base = selectedAssets.base;
      const quote = selectedAssets.quote;
      try {
        setLoadingOrderHistoryRows(true);
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
          setOrderHistoryRows(
            marketTakersHistories.map((history) => {
              return formOrderHistoryRow(history, base, quote);
            })
          );
        }
        setLoadingOrderHistoryRows(false);
      } catch (e) {
        console.log(e);
        setLoadingOrderHistoryRows(false);
      }
    }
  }, [
    selectedAssets,
    setLoadingOrderHistoryRows,
    getFillOrderHistory,
    setOrderHistoryRows,
    formOrderHistoryRow,
  ]);

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
  const getUserHistory = useCallback(async () => {
    if (selectedAssets && id && id !== "") {
      const base = selectedAssets.base;
      const quote = selectedAssets.quote;
      try {
        setLoadingUserHistoryRows(true);
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
              orderAssetsIds.includes(base.id) &&
              orderAssetsIds.includes(quote.id)
            );
          }
        );
        const userHistoryRows = await Promise.all(
          fillOrdersHistoryForThePair.map(
            async (fillOrderHistoryForThePair) => {
              const operationDetails = fillOrderHistoryForThePair.op[1];
              return formUserHistoryRow(
                base,
                quote,
                fillOrderHistoryForThePair,
                limitOrders.find(
                  (order) => order.id === operationDetails.order_id
                )
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
  }, [
    selectedAssets,
    id,
    localStorageAccount,
    getFullAccount,
    setLoadingUserHistoryRows,
    getAccountHistoryById,
    formUserHistoryRow,
    setUserOrderHistoryRows,
  ]);

  const refreshHistory = useCallback(async () => {
    await getHistory();
    await getUserHistory();
  }, [getHistory, getUserHistory]);

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
    const previousBaseSymbol = currentPair.split("_")[1];
    const previousQuoteSymbol = currentPair.split("_")[0];
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
  }, [currentPair, dbApi]);

  const subscribeToMarket = useCallback(async () => {
    if (selectedAssets && synced) {
      try {
        await Promise.all([
          getTradingPairsStats(),
          refreshOrderBook(),
          refreshHistory(),
        ]);
        await dbApi("subscribe_to_market", [
          () => {
            setTimeout(() => {
              getTradingPairsStats();
            }, REQUIRED_TICKER_UPDATE_TIME);
            refreshOrderBook();
            refreshHistory();
          },
          selectedAssets.base.symbol,
          selectedAssets.quote.symbol,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [
    selectedAssets,
    synced,
    getTradingPairsStats,
    refreshOrderBook,
    refreshHistory,
    dbApi,
  ]);

  useEffect(() => {
    let ignore = false;
    async function setPairAssets() {
      setLoadingSelectedPair(true);
      const baseQuote = await getPairAssets();
      if (!ignore && baseQuote) {
        setSelectedAssets({ base: baseQuote.base, quote: baseQuote.quote });
        setLoadingSelectedPair(false);
      }
    }
    setPairAssets();
    return () => {
      ignore = true;
    };
  }, [setLoadingSelectedPair, getPairAssets, setSelectedAssets]);

  useEffect(() => {
    subscribeToMarket();
    return () => {
      unsubscribeFromMarket();
    };
  }, [selectedAssets, id]);

  return {
    tradingPairsStats,
    loadingTradingPairsStats,
    selectedAssets,
    loadingSelectedPair,
    isPairModalVisible,
    setIsPairModalVisible,
    handleClickOnPair,
    exchanges,
    asks,
    bids,
    loadingAsksBids,
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
