import { ChangeEvent, Dispatch } from "react";

import {
  TransactionMessageAction,
  TransactionMessageState,
} from "../../../../../common/hooks";
import { Account, Proxy, SignerKey } from "../../../../../common/types";

export type UseProxyTab = {
  name: string;
  searchError: boolean;
  searchedAccount: Account | undefined;
  updateAccountFee: number;
  transactionMessageState: TransactionMessageState;
  dispatchTransactionMessage: Dispatch<TransactionMessageAction>;
  addProxy: (account: Account) => void;
  removeProxy: () => void;
  searchChange: (inputEvent: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handlePublishChanges: (password: SignerKey) => Promise<void>;
  localProxy: Proxy;
  isPublishable: boolean;
  resetChanges: () => void;
  searchValue: string;
  isSameAccount: boolean;
  accountAlreadyAdded: boolean;
};
