import { Asset, SidechainAcccount } from "../../types";

export type UserContextType = {
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  id: string;
  name: string;
  assets: Asset[];
  sidechainAcccounts: SidechainAcccount[];
  isAccountLocked: boolean;
  updateAccount: (
    id: string,
    name: string,
    assets: Asset[],
    acccounts: SidechainAcccount[]
  ) => void;
  setAssets: (assets: Asset[]) => void;
  setSidechainAcccounts: (sidechainAcccounts: SidechainAcccount[]) => void;
  setIsAccountLocked: (isAccountLocked: boolean) => void;
};
