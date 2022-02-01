import { Asset } from ".";

export type Cache = {
  created: number;
  accounts: CacheAccount[];
  assets: Asset[];
};

export type CacheAccount = {
  id: string;
  name: string;
};
