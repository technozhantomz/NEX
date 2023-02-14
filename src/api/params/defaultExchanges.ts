import { Exchanges } from "../../common/types";

import { defaultQuote, defaultToken } from "./networkParams";

export const defaultExchanges: Exchanges = {
  active: `${defaultQuote}_${defaultToken}`,
  list: [`${defaultQuote}/${defaultToken}`],
  swapPair: `${defaultQuote}_${defaultToken}`,
};
