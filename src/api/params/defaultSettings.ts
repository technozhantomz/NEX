import { Settings } from "../../common/types";

import { defaultQuote } from "./networkparams";

export const defaultSettings: Settings = {
  language: "en",
  darkTheme: false,
  advancedMode: true,
  nodeAutoselect: true,
  defaultAsset: defaultQuote as string,
  notifications: {
    allow: true,
    additional: {
      transferToMe: true,
      fundSent: false,
      orderCreated: false,
      orderFilled: false,
      orderCanceled: false,
      orderExpired: false,
      fundsReceived: false,
      swapStarted: false,
      swapFilled: false,
      swapCanceled: false,
      accountUpdated: false,
    },
  },
  walletLock: 0,
};
