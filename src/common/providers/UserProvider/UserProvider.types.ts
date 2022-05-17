import { Asset } from "../../types";

export type UserContextType = {
  id: string;
  name: string;
  assets: Asset[];
  password: string;
  localStorageAccount: string;
  walletLockExp: number;
  setWalletLockExp: (value: number) => void;
  setLocalStorageAccount: (value: string) => void;
  updateAccount: (id: string, name: string, assets: Asset[]) => void;
  setAssets: (assets: Asset[]) => void;
  setPassword: (password: string) => void;
};
