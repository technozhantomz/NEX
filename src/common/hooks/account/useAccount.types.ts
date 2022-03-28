import { Account, FullAccount } from "../../types";

export type UseAccountResult = {
  formAccountByName: (name: string, subscription: boolean) => Promise<void>;
  loading: boolean;
  formAccountBalancesByName: (name: string) => Promise<void>;
  getFullAccount: (
    name: string,
    subscription: boolean
  ) => Promise<FullAccount | undefined>;
  getAccountByName: (name: string) => Promise<Account | undefined>;
  getPrivateKey: (password: string, role: string) => string;
  formAccountAfterConfirmation: (fullAccount: FullAccount) => Promise<void>;
  removeAccount: () => void;
  validateAccountPassword: (password: string, account: Account) => boolean;
  getUserNameById: (id: string) => Promise<string>;
};
