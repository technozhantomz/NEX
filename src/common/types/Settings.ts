export type Settings = {
  advancedMode: boolean;
  darkTheme: boolean;
  defaultAsset: string;
  language: string;
  nodeAutoselect: boolean;
};

export type UserSettings = {
  notifications: {
    allow: boolean;
    additional: {
      transferToMe: boolean;
    };
  };
  rememberMe: boolean;
  walletLock: number;
};
