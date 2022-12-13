import { BitcoinSidechainAccounts, SidechainAcccount } from "../../types";

export type SideChainContextType = {
  bitcoinSidechainAccounts: BitcoinSidechainAccounts;
  hasBTCDepositAddress: boolean;
  hasBTCWithdrawPublicKey: boolean;
  hasHiveAddress: boolean;
  hasEthereumAddress: boolean;
  sidechainAccounts: SidechainAcccount[];
  bitcoinSidechainAccount: SidechainAcccount | undefined;
  loadingSidechainAccounts: boolean;
  setBitcoinSidechainAccounts: (value: BitcoinSidechainAccounts) => void;
  getSidechainAccounts: (accountId: string) => Promise<void>;
};
