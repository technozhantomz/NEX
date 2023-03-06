import { Account, Sidechain } from "../../types";

export type UseSonNetworkResult = {
  sonAccount: Account | undefined;
  getSonNetworkStatus: (chain: Sidechain) => Promise<SonNetworkStatus>;
};

export type SonNetworkStatus = {
  status: [string, string][];
  isSonNetworkOk: boolean;
};
