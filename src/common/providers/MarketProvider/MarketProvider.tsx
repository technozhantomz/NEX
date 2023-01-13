import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// import { useAsset } from "../../hooks";
import { useMarketHistory, useSessionStorage } from "../../hooks";
import { MarketPair, OrderHistory } from "../../types";
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
  setSelectedPair: function (selectedPair: MarketPair): void {
    throw new Error(`Function not implemented. ${selectedPair}`);
  },
};

const MarketContext = createContext<MarketContextType>(defaultMarketState);

export const MarketProvider = ({ children }: Props): JSX.Element => {
  const { dbApi } = usePeerplaysApiContext();
  const { getFillOrderHistory } = useMarketHistory();
  //   const { getAssetsBySymbols } = useAsset();
  const { synced } = useChainStoreContext();
  const [selectedPair, setSelectedPair] = useSessionStorage(
    "selectedMarketPair"
  ) as [MarketPair, (selectedPair: MarketPair) => void];
  const [marketHistory, setMarketHistory] = useState<OrderHistory[]>([]);

  const getHistory = useCallback(async () => {
    if (selectedPair) {
      const base = selectedPair.base;
      const quote = selectedPair.quote;
      try {
        // setLoadingOrderHistoryRows(true);
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

  const refreshHistory = useCallback(async () => {
    await getHistory();
    // await getUserHistory(); //NOTE should i add user history to the contect?
  }, [getHistory]);

  const subscribeToMarket = useCallback(async () => {
    if (selectedPair && synced) {
      try {
        await Promise.all([
          //   getTradingPairsStats(),
          //   refreshOrderBook(),
          refreshHistory(),
        ]);
        await dbApi("subscribe_to_market", [
          () => {
            setTimeout(() => {
              //   getTradingPairsStats();
            }, REQUIRED_TICKER_UPDATE_TIME);
            // refreshOrderBook();
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
    // getTradingPairsStats,
    // refreshOrderBook,
    refreshHistory,
    dbApi,
  ]);

  useEffect(() => {
    subscribeToMarket();
    // return () => {
    //   unsubscribeFromMarket();
    // };
  }, [selectedPair]);

  useEffect(() => {
    console.log(selectedPair);
    //TODO: unsubscribe to market when on selectPair change.
  }, [setSelectedPair]);
  return (
    <MarketContext.Provider
      value={{ selectedPair, marketHistory, setSelectedPair }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = (): MarketContextType => {
  return useContext<MarketContextType>(MarketContext);
};
