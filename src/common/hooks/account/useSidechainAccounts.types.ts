import { BitcoinSideChainAccount } from "../../../../../common/types";

export type UseSidechainAccounts = {
  sidechainAcccounts: BitcoinSideChainAccount[];
  hasBTCDepositAddress: boolean;
  getSidechainAccounts: (accountId: string) => Promise<unknown[]>;
};
