import { Asset, Vote } from "../../types";

export type UserContextType = {
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  id: string;
  name: string;
  assets: Asset[];
  votes: Vote[];
  isAccountLocked: boolean;
  updateAccount: (
    id: string,
    name: string,
    assets: Asset[],
    votes: Vote[]
  ) => void;
  setAssets: (assets: Asset[]) => void;
  setVotes: (votes: Vote[]) => void;
  setIsAccountLocked: (isAccountLocked: boolean) => void;
};
