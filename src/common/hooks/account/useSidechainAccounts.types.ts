import { SidechainAcccount } from "../../types";

export type UseSidechainAccountsResult = {
  hasBTCDepositAddress: boolean;
  hasBTCWithdrawPublicKey: boolean;
  getSidechainAccounts: (accountId: string) => Promise<void>;
  sidechainAccounts: SidechainAcccount[];
  bitcoinSidechainAccount: SidechainAcccount | undefined;
  loadingSidechainAccounts: boolean;
};
