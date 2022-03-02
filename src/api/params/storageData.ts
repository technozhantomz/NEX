import { Settings } from "../../common/types";

import { defaultQuote } from "./networkparams";

export const defaultSettings: Settings = {
  language: "en",
  darkTheme: false,
  advancedMode: false,
  notifications: true,
  walletLock: 0,
  nodeAutoselect: true,
  defaultAsset: defaultQuote as string,
  rememberMe: true,
};
