import { Account, Asset, KeyType } from "../../types";

export type UserContextType = {
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  id: string;
  name: string;
  assets: Asset[];
  password: string;
  keyType: KeyType;
  updateAccount: (
    id: string,
    name: string,
    assets: Asset[],
    account: Account | undefined
  ) => void;
  setAssets: (assets: Asset[]) => void;
  account: Account | undefined;
  savePassword: (password: string, keyType: KeyType) => void;
  removePassword: () => void;
};
