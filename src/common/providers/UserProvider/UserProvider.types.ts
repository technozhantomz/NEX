import {
  Account,
  Asset,
  BitcoinSidechainAccounts,
  KeyType,
  SidechainAcccount,
} from "../../types";

export type UserContextType = {
  localStorageAccount: string;
  setLocalStorageAccount: (value: string) => void;
  id: string;
  name: string;
  assets: Asset[];
  password: string;
  keyType: KeyType;
  bitcoinSidechainAccounts: BitcoinSidechainAccounts;
  setBitcoinSidechainAccounts: (value: BitcoinSidechainAccounts) => void;
  updateAccount: (
    id: string,
    name: string,
    assets: Asset[],
    account: Account | undefined
  ) => void;
  setAssets: (assets: Asset[]) => void;
  account: Account | undefined;
  savePassword: (password: string, keyType: KeyType) => void;
  removePassword: () => void;
  hasBTCDepositAddress: boolean;
  hasBTCWithdrawPublicKey: boolean;
  getSidechainAccounts: (accountId: string) => Promise<void>;
  sidechainAccounts: SidechainAcccount[];
  bitcoinSidechainAccount: SidechainAcccount | undefined;
  loadingSidechainAccounts: boolean;
};
