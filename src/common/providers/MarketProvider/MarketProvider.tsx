import React, {
  createContext,
  // useCallback,
  useContext,
  //   useEffect,
  //   useState,
} from "react";

// import { useAsset } from "../../hooks";
import { useSessionStorage } from "../../hooks";
import { MarketPair } from "../../types";

import { MarketContextType } from "./MarketProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultMarketState: MarketContextType = {
  selectedPair: undefined,
  setSelectedPair: function (selectedPair: MarketPair): void {
    throw new Error(`Function not implemented. ${selectedPair}`);
  },
};

const MarketContext = createContext<MarketContextType>(defaultMarketState);

export const MarketProvider = ({ children }: Props): JSX.Element => {
  //   const { getAssetsBySymbols } = useAsset();
  const [selectedPair, setSelectedPair] = useSessionStorage(
    "selectedMarketPair"
  ) as [MarketPair, (selectedPair: MarketPair) => void];

  return (
    <MarketContext.Provider value={{ selectedPair, setSelectedPair }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = (): MarketContextType => {
  return useContext<MarketContextType>(MarketContext);
};
