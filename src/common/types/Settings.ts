export type Settings = {
  advancedMode: boolean;
  darkTheme: boolean;
  defaultAsset: string;
  language: string;
  nodeAutoselect: boolean;
  notifications: {
    allow: boolean;
    additional: {
      transferToMe: boolean;
      fundSent: boolean;
      orderCreated: boolean;
      orderFilled: boolean;
      orderCanceled: boolean;
      orderExpired: boolean;
      fundsReceived: boolean;
      swapStarted: boolean;
      swapFilled: boolean;
      swapCanceled: boolean;
      accountUpdated: boolean;
    };
  };
  walletLock: number;
};
