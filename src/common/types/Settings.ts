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
    };
  };
  walletLock: number;
  rememberMe: true;
};
