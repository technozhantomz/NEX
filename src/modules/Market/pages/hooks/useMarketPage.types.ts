import { Dispatch, SetStateAction } from "react";

import { MarketPair } from "../../../../common/types";

export type UseMarketPageResult = {
  selectedPair: MarketPair | undefined;
  loadingSelectedPair: boolean;
  isPairModalVisible: boolean;
  handleClickOnPair: () => void;
  setIsPairModalVisible: Dispatch<SetStateAction<boolean>>;
  //   pageLoaded: boolean;
};
