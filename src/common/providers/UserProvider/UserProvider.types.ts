import { Account, Asset } from "../../types";

export type UserContextType = {
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  id: string;
  name: string;
  assets: Asset[];
  password: string;
  updateAccount: (
    id: string,
    name: string,
    assets: Asset[],
    account: Account | undefined
  ) => void;
  setAssets: (assets: Asset[]) => void;
  setPassword: (password: string) => void;
  account: Account | undefined;
};
