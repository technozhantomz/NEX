import { Asset, IAccountData } from ".";

export type Cache = {
  created: number;
  accounts: CacheAccount[];
  assets: Asset[];
  userAccount: IAccountData;
};

export type CacheAccount = {
  id: string;
  name: string;
};
