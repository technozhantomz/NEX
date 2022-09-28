import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { Account, Proxy } from "../../../../../common/types";
import { ProxyRow } from "../components/ProxyTable/hooks/useProxyTable.types";

export type UseProxyTab = {
  name: string;
  searchError: boolean;
  searchedAccount: Account | undefined;
  updateAccountFee: number;
  loadingTransaction: boolean;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  addChange: (account: Account) => void;
  cancelChange: () => void;
  searchChange: (inputEvent: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handlePublishChanges: (password: string) => Promise<void>;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  pendingChanges: ProxyRow[];
  localProxy: Proxy;
  isPublishable: boolean;
  resetChanges: () => void;
  searchValue: string;
  isSameAccount: boolean;
  accountAlreadyAdded: boolean;
};
