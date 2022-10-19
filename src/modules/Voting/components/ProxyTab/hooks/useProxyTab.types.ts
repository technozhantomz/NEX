import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Account, Proxy, SignerKey } from "../../../../../common/types";

export type UseProxyTab = {
  name: string;
  searchError: boolean;
  searchedAccount: Account | undefined;
  updateAccountFee: number;
  loadingTransaction: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  addProxy: (account: Account) => void;
  removeProxy: () => void;
  searchChange: (inputEvent: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handlePublishChanges: (password: SignerKey) => Promise<void>;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  localProxy: Proxy;
  isPublishable: boolean;
  resetChanges: () => void;
  searchValue: string;
  isSameAccount: boolean;
  accountAlreadyAdded: boolean;
};
