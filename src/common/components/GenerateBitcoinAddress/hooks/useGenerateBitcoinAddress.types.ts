import { Dispatch, SetStateAction } from "react";

import { BitcoinSidechainAccounts, SignerKey } from "../../../types";

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
