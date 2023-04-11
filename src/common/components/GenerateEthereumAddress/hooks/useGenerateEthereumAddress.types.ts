import { Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../hooks";
import { EthereumSidechainAccounts, SignerKey } from "../../../types";

export type UseGenerateEthereumAddressResult = {
  sessionEthereumSidechainAccounts: EthereumSidechainAccounts | undefined;
  setSessionEthereumSidechainAccounts: (
    value: EthereumSidechainAccounts
  ) => void;
  transactionMessageState: TransactionMessageState;
  dispatchTransactionMessage: Dispatch<TransactionMessageAction>;
  generateEthereumAddresses: (signerKey: SignerKey) => Promise<void>;
};
