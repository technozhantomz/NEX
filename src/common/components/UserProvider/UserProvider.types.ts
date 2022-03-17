import { Asset } from "../../types";

export type UserContextType = {
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  id: string;
  name: string;
  assets: Asset[];
  isAccountLocked: boolean;
  updateAccount: (id: string, name: string, assets: Asset[]) => void;
  setAssets: (assets: Asset[]) => void;
  setIsAccountLocked: (isAccountLocked: boolean) => void;
};
