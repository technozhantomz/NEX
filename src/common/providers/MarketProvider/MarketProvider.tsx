import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Form, FormInstance } from "../../../ui/src";
import { useMarketHistory, useOrderBook } from "../../hooks";
import {
  Asset,
  MarketHistory,
  MarketOrder,
  MarketPair,
  OrderForm,
  OrderHistory,
  Ticker,
  TradeHistoryRow,
} from "../../types";
import { useChainStoreContext } from "../ChainStoreProvider";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";

import { MarketContextType } from "./MarketProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultMarketState: MarketContextType = {
  selectedPair: undefined,
  marketHistory: [],
  asks: [],
  bids: [],
  setMarketPair: function (base: Asset, quote: Asset): void {
    throw new Error(`Function not implemented. for ${base} ${quote}`);
  },
  loadingAsksBids: true,
  lastTradeHistory: undefined,
  fillLastTradeHistory: function (lastTradeHistory?: TradeHistoryRow): void {
    throw new Error(`Function not implemented. for ${lastTradeHistory}`);
  },
  buyOrderForm: {} as FormInstance<OrderForm>,
  sellOrderForm: {} as FormInstance<OrderForm>,
  buckets: [15, 60, 300, 3600, 86400],
  OHLCVs: undefined,
  dayOHLCVs: undefined,
  ticker: undefined,
};

const MarketContext = createContext<MarketContextType>(defaultMarketState);

export const MarketProvider = ({ children }: Props): JSX.Element => {
  const { dbApi } = usePeerplaysApiContext();
  const {
    getFillOrderHistory,
    getMarketHistoryBuckets,
    getMarketHistory,
    getTicker,
  } = useMarketHistory();
  const { getOrderBook } = useOrderBook();
  const { synced } = useChainStoreContext();

  const [selectedPair, setSelectedPair] = useState<MarketPair>();
  const [marketHistory, setMarketHistory] = useState<OrderHistory[]>();
  const [asks, setAsks] = useState<MarketOrder[]>();
  const [bids, setBids] = useState<MarketOrder[]>();
  const [loadingAsksBids, setLoadingAsksBids] = useState<boolean>(true);
  const [lastTradeHistory, setLastTradeHistory] = useState<TradeHistoryRow>();
  const [buyOrderForm] = Form.useForm<OrderForm>();
  const [sellOrderForm] = Form.useForm<OrderForm>();
  // in seconds
  const [buckets, _setBuckets] = useState<number[]>([15, 60, 300, 3600, 86400]);
  const [OHLCVs, _setOHLCVs] = useState<MarketHistory[]>();
  const [dayOHLCVs, _setDayOHLCVs] = useState<MarketHistory>();
  const [ticker, _setTicker] = useState<Ticker>();
  // in seconds
  const [bucketSize, setBucketSize] = useState<number>(3600);
  const bucketCount = 200;

  const changeBucketSize = useCallback(
    (bucketSize: number) => {
      setBucketSize(bucketSize);
    },
    [setBucketSize]
  );

  const setHistory = useCallback(async () => {
    if (selectedPair) {
      const histories = await getFillOrderHistory(selectedPair);
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
        setMarketHistory(marketTakersHistories);
      }
    }
  }, [selectedPair, getFillOrderHistory, setMarketHistory]);

  const setAsksBids = useCallback(async () => {
    if (selectedPair) {
      setLoadingAsksBids(true);
      const { asks, bids } = await getOrderBook(selectedPair);
      // This should change, right now, getOrderBook is not correct
      const updatedAsks = asks.map((ask) => {
        return {
          ...ask,
          isBuyOrder: false,
        };
      }) as MarketOrder[];
      const updatedBids = bids.map((bid) => {
        return {
          ...bid,
          isBuyOrder: true,
        };
      }) as MarketOrder[];
      setAsks(updatedAsks);
      setBids(updatedBids);
      setLoadingAsksBids(false);
    }
  }, [selectedPair, getOrderBook, setAsks, setBids]);

  const setBuckets = useCallback(async () => {
    if (selectedPair) {
      const buckets = await getMarketHistoryBuckets();
      if (buckets) {
        _setBuckets(buckets);
        if (buckets.indexOf(bucketSize) === -1) {
          changeBucketSize(buckets[buckets.length - 1]);
        }
      }
    }
  }, [
    selectedPair,
    getMarketHistoryBuckets,
    _setBuckets,
    bucketSize,
    changeBucketSize,
  ]);

  const setDayOHLCVs = useCallback(async () => {
    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() - 1);
    const today = new Date();
    const bucketSize = 86400;
    if (selectedPair) {
      const dayOHLCVs = await getMarketHistory(
        selectedPair.base.symbol,
        selectedPair.quote.symbol,
        bucketSize,
        lastDay.toISOString().slice(0, -5),
        today.toISOString().slice(0, -5)
      );
      if (dayOHLCVs && dayOHLCVs.length) {
        _setDayOHLCVs(dayOHLCVs[0]);
      }
    }
  }, [selectedPair, getMarketHistory, _setDayOHLCVs]);

  const setOHLCVs = useCallback(
    async (bucketSize: number) => {
      if (selectedPair) {
        let startDate = new Date();
        let startDate2 = new Date();
        let startDate3 = new Date();
        const endDate = new Date();
        startDate = new Date(
          startDate.getTime() - bucketSize * bucketCount * 1000
        );
        startDate2 = new Date(
          startDate2.getTime() - bucketSize * bucketCount * 2000
        );
        startDate3 = new Date(
          startDate3.getTime() - bucketSize * bucketCount * 3000
        );
        endDate.setDate(endDate.getDate() + 1);
        const [result1, result2, result3] = await Promise.all([
          getMarketHistory(
            selectedPair.base.symbol,
            selectedPair.quote.symbol,
            bucketSize,
            startDate.toISOString().slice(0, -5),
            endDate.toISOString().slice(0, -5)
          ),
          getMarketHistory(
            selectedPair.base.symbol,
            selectedPair.quote.symbol,
            bucketSize,
            startDate2.toISOString().slice(0, -5),
            startDate.toISOString().slice(0, -5)
          ),
          getMarketHistory(
            selectedPair.base.symbol,
            selectedPair.quote.symbol,
            bucketSize,
            startDate3.toISOString().slice(0, -5),
            startDate2.toISOString().slice(0, -5)
          ),
        ]);
        const data1 = result2 || [];
        const data2 = result3 || [];
        if (result1) {
          _setOHLCVs(data1.concat(data2.concat(result1)));
        }
      }
    },
    [selectedPair, bucketCount, getMarketHistory, _setOHLCVs]
  );

  const setTicker = useCallback(async () => {
    if (selectedPair) {
      const ticker = await getTicker(selectedPair.base, selectedPair.quote);
      if (ticker) {
        _setTicker(ticker);
      }
    }
  }, [selectedPair, getTicker, _setTicker]);

  const subscription = useCallback(
    (notification: any) => {
      let hasFill = false;
      if (
        notification &&
        notification.length &&
        typeof notification[0] !== "string" &&
        notification[0].length === 2 &&
        notification[0][0] &&
        notification[0][0][0].length === 2 &&
        notification[0][0][0][0] === 4
      ) {
        hasFill = true;
        Promise.all([
          !hasFill ? null : setHistory(),
          setAsksBids(),
          !hasFill ? null : setOHLCVs(bucketSize),
          !hasFill ? null : setDayOHLCVs(),
          setTicker(),
        ]);
      }
    },
    [setHistory, setAsksBids, setOHLCVs, bucketSize, setDayOHLCVs, setTicker]
  );

  const subscribeToMarket = useCallback(async () => {
    if (selectedPair && synced && bucketSize) {
      try {
        buyOrderForm.resetFields();
        sellOrderForm.resetFields();
        await Promise.all([
          setHistory(),
          setAsksBids(),
          setBuckets(),
          setOHLCVs(bucketSize),
          setDayOHLCVs(),
          setTicker(),
        ]);
        await dbApi("subscribe_to_market", [
          subscription,
          selectedPair.base.symbol,
          selectedPair.quote.symbol,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [
    selectedPair,
    synced,
    bucketSize,
    buyOrderForm,
    sellOrderForm,
    setHistory,
    setAsksBids,
    setBuckets,
    setOHLCVs,
    setDayOHLCVs,
    setTicker,
    dbApi,
    subscription,
  ]);

  const unsubscribeFromMarket = useCallback(async () => {
    if (selectedPair) {
      try {
        await dbApi("unsubscribe_from_market", [
          () => {
            console.log("unsubscribing");
          },
          selectedPair.base.symbol,
          selectedPair.quote.symbol,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedPair, dbApi, setSelectedPair]);

  const setMarketPair = useCallback(
    (base: Asset, quote: Asset) => {
      setSelectedPair({ base, quote } as MarketPair);
    },
    [setSelectedPair]
  );

  const fillLastTradeHistory = useCallback(
    (lastTradeHistory?: TradeHistoryRow) => {
      setLastTradeHistory(lastTradeHistory);
    },
    [setLastTradeHistory]
  );

  useEffect(() => {
    subscribeToMarket();
    return () => {
      unsubscribeFromMarket();
    };
  }, [selectedPair, synced, bucketSize]);

  const context = useMemo(() => {
    return {
      selectedPair,
      marketHistory,
      asks,
      bids,
      setMarketPair,
      loadingAsksBids,
      lastTradeHistory,
      fillLastTradeHistory,
      buyOrderForm,
      sellOrderForm,
      buckets,
      OHLCVs,
      dayOHLCVs,
      ticker,
    };
  }, [
    selectedPair,
    marketHistory,
    asks,
    bids,
    setMarketPair,
    loadingAsksBids,
    lastTradeHistory,
    fillLastTradeHistory,
    buyOrderForm,
    sellOrderForm,
    buckets,
    OHLCVs,
    dayOHLCVs,
    ticker,
  ]);

  return (
    <MarketContext.Provider value={context}>{children}</MarketContext.Provider>
  );
};
export const useMarketContext = (): MarketContextType => {
  return useContext<MarketContextType>(MarketContext);
};
