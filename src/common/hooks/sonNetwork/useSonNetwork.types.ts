import { Account } from "../../types";

export type UseSonNetworkResult = {
  sonAccount: Account | undefined;
  getSonNetworkStatus: () => Promise<SonNetworkStatus>;
};

export type SonNetworkStatus = {
  status: [string, string][];
  isSonNetworkOk: boolean;
};
