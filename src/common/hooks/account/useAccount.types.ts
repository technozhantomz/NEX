import { Account, FullAccount } from "../../types";

export type UseAccountResult = {
  formAccountByName: (name: string, subscription: boolean) => Promise<void>;
  loading: boolean;
  formAccountBalancesByName: (name: string) => Promise<void>;
  getFullAccount: (
    name: string,
    subscription: boolean
  ) => Promise<FullAccount | undefined>;
  getAccountByName: (name: string) => Promise<Account>;
  getPrivateKey: (password: string, role: string) => string;
  formAccountAfterConfirmation: (fullAccount: FullAccount) => Promise<void>;
  removeAccount: () => void;
};
