import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../types";

export type UseGenerateBitcoinAddressResult = {
  bitcoinSidechainAccounts: BitcoinSidechainAccounts | undefined;
  setBitcoinSidechainAccounts: (value: BitcoinSidechainAccounts) => void;
  transactionErrorMessage: string;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  transactionSuccessMessage: string;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  loadingTransaction: boolean;
  generateBitcoinAddresses: (signerKey: SignerKey) => Promise<void>;
};

export type BitcoinSidechainAccounts =
  | {
      deposit: BitcoinAccount;
      withdraw: BitcoinAccount;
    }
  | undefined;

export type BitcoinAccount = {
  address: string;
  pubKey: string;
  privateKey: string;
};
