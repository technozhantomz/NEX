import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useMarketHistory, useOrderBook, useSessionStorage } from "../../hooks";
import { MarketOrder, MarketPair, OrderHistory } from "../../types";
import { useChainStoreContext } from "../ChainStoreProvider";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";

import { MarketContextType } from "./MarketProvider.types";

type Props = {
  children: React.ReactNode;
};

// This is in milliseconds
const REQUIRED_TICKER_UPDATE_TIME = 800;
const defaultMarketState: MarketContextType = {
  selectedPair: undefined,
  marketHistory: [],
  asks: [],
  bids: [],
  // ticker: undefined,
  setSelectedPair: function (selectedPair: MarketPair): void {
    throw new Error(`Function not implemented. ${selectedPair}`);
  },
  unsubscribeFromMarket: async function (): Promise<void> {
    throw new Error(`Function not implemented.`);
  },
};

const MarketContext = createContext<MarketContextType>(defaultMarketState);

export const MarketProvider = ({ children }: Props): JSX.Element => {
  const { dbApi } = usePeerplaysApiContext();
  const { getFillOrderHistory } = useMarketHistory();
  const { getOrderBook } = useOrderBook();
  const { synced } = useChainStoreContext();
  const [selectedPair, setSelectedPair] = useSessionStorage(
    "selectedMarketPair"
  ) as [MarketPair, (selectedPair: MarketPair) => void];
  const [marketHistory, setMarketHistory] = useState<OrderHistory[]>([]);
  // const [ticker, setTicker] = useState<Ticker>();
  const [asks, setAsks] = useState<MarketOrder[]>([]);
  const [bids, setBids] = useState<MarketOrder[]>([]);

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
  }, [selectedPair, getFillOrderHistory]);

  // const subscribeToTicker = useCallback(async () => {
  //   if (selectedPair) {
  //     try {
  //       const tickerStats = await getTicker(
  //         selectedPair.base,
  //         selectedPair.quote
  //       );

  //       setTicker(tickerStats);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // }, [selectedPair]);

  const getAsksBids = useCallback(async () => {
    if (selectedPair) {
      try {
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
      } catch (e) {
        console.log(e);
        setAsks([]);
        setBids([]);
      }
    }
  }, [selectedPair, getOrderBook, setAsks, setBids]);

  const refreshHistory = useCallback(async () => {
    await getHistory();
    // await getUserHistory(); //NOTE should i add user history to the contect?
  }, [getHistory]);

  const refreshOrderBook = useCallback(async () => {
    await getAsksBids();
    // await getUserOrderBook();
  }, [getAsksBids]);

  const subscribeToMarket = useCallback(async () => {
    if (selectedPair && synced) {
      try {
        await Promise.all([
          // subscribeToTicker(),
          refreshOrderBook(),
          refreshHistory(),
        ]);
        await dbApi("subscribe_to_market", [
          () => {
            setTimeout(() => {
              // subscribeToTicker();
            }, REQUIRED_TICKER_UPDATE_TIME);
            refreshOrderBook();
            refreshHistory();
          },
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
    // subscribeToTicker,
    refreshOrderBook,
    refreshHistory,
    dbApi,
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
        setSelectedPair(undefined);
      } catch (e) {
        console.log(e);
      }
    }
  }, [selectedPair, dbApi]);

  useEffect(() => {
    subscribeToMarket();
  }, [selectedPair]);

  return (
    <MarketContext.Provider
      value={{
        selectedPair,
        marketHistory,
        asks,
        bids,
        // ticker,
        setSelectedPair,
        unsubscribeFromMarket,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = (): MarketContextType => {
  return useContext<MarketContextType>(MarketContext);
};
