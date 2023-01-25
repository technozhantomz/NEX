import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useMarketHistory, useOrderBook } from "../../hooks";
import {
  Asset,
  MarketOrder,
  MarketPair,
  OrderHistory,
  TradeHistoryRow,
} from "../../types";
import { useChainStoreContext } from "../ChainStoreProvider";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";

import { MarketContextType } from "./MarketProvider.types";

type Props = {
  children: React.ReactNode;
};

// This is in milliseconds
// const REQUIRED_TICKER_UPDATE_TIME = 800;
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
};

const MarketContext = createContext<MarketContextType>(defaultMarketState);

export const MarketProvider = ({ children }: Props): JSX.Element => {
  const { dbApi } = usePeerplaysApiContext();
  const { getFillOrderHistory } = useMarketHistory();
  const { getOrderBook } = useOrderBook();
  const { synced } = useChainStoreContext();
  const [selectedPair, setSelectedPair] = useState<MarketPair>();
  const [marketHistory, setMarketHistory] = useState<OrderHistory[]>();
  const [asks, setAsks] = useState<MarketOrder[]>();
  const [bids, setBids] = useState<MarketOrder[]>();
  const [loadingAsksBids, setLoadingAsksBids] = useState<boolean>(true);
  const [lastTradeHistory, setLastTradeHistory] = useState<TradeHistoryRow>();

  const getHistory = useCallback(async () => {
    if (selectedPair) {
      const base = selectedPair.base;
      const quote = selectedPair.quote;
      try {
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
          setMarketHistory(marketTakersHistories);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedPair, getFillOrderHistory, setMarketHistory]);

  const getAsksBids = useCallback(async () => {
    if (selectedPair) {
      try {
        setLoadingAsksBids(true);
        setAsks([]);
        setBids([]);
        const { asks, bids } = await getOrderBook(
          selectedPair.base,
          selectedPair.quote
        );
        setAsks(
          asks.map((ask) => {
            return { ...ask, isBuyOrder: false };
          }) as MarketOrder[]
        );
        setBids(
          bids.map((bid) => {
            return { ...bid, isBuyOrder: true };
          }) as MarketOrder[]
        );
        setLoadingAsksBids(false);
      } catch (e) {
        console.log(e);
        setAsks([]);
        setBids([]);
        setLoadingAsksBids(false);
      }
    }
  }, [selectedPair, getOrderBook, setAsks, setBids]);

  const subscribeToMarket = useCallback(async () => {
    if (selectedPair && synced) {
      try {
        await Promise.all([getHistory(), getAsksBids()]);
        await dbApi("subscribe_to_market", [
          () => {
            getHistory();
            getAsksBids();
          },
          selectedPair.base.symbol,
          selectedPair.quote.symbol,
        ]);
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedPair, synced, dbApi, getHistory, getAsksBids]);

  const unsubscribeFromMarket = useCallback(async () => {
    console.log("test unsub before", selectedPair);
    if (selectedPair) {
      console.log("test unsub", selectedPair);
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
      setSelectedPair({ base: base, quote: quote } as MarketPair);
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
    console.log("test selectedPair", selectedPair);
    subscribeToMarket();
    return () => {
      unsubscribeFromMarket();
    };
  }, [selectedPair]);

  return (
    <MarketContext.Provider
      value={{
        selectedPair,
        marketHistory,
        asks,
        bids,
        setMarketPair,
        loadingAsksBids,
        lastTradeHistory,
        fillLastTradeHistory,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
export const useMarketContext = (): MarketContextType => {
  return useContext<MarketContextType>(MarketContext);
};
