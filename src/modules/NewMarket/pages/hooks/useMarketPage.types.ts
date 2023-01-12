import { MarketPair } from "../../../../common/types";

export type UseMarketPageResult = {
  selectedPair: MarketPair | undefined;
  loadingSelectedPair: boolean;
  //   pageLoaded: boolean;
};
