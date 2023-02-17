import { Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../hooks";
import { BitcoinSidechainAccounts, SignerKey } from "../../../types";

export type UseGenerateBitcoinAddressResult = {
  bitcoinSidechainAccounts: BitcoinSidechainAccounts | undefined;
  setBitcoinSidechainAccounts: (value: BitcoinSidechainAccounts) => void;
  transactionMessageState: TransactionMessageState;
  dispatchTransactionMessage: Dispatch<TransactionMessageAction>;
  generateBitcoinAddresses: (signerKey: SignerKey) => Promise<void>;
};
