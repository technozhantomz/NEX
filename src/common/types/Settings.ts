export type Settings = {
  advancedMode: boolean;
  darkTheme: boolean;
  defaultAsset: string;
  language: string;
  nodeAutoselect: boolean;
  notifications: {
    allow: boolean;
    selectedNotifications: string[];
  };
  walletLock: number;
};
