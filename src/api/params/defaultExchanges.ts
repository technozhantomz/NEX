import { Exchanges } from "../../common/types";

import { defaultQuote, defaultToken } from "./networkparams";

export const defaultExchanges: Exchanges = {
  active: `${defaultQuote}_${defaultToken}`,
  list: [`${defaultQuote}/${defaultToken}`],
};
