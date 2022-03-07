import { FullAccount } from "../../types";

export type UseAccountResult = {
  formAccountByName: (name: string, subscription: boolean) => Promise<void>;
  loading: boolean;
  formAccountBalancesByName: (name: string) => Promise<void>;
  getFullAccount: (
    name: string,
    subscription: boolean
  ) => Promise<FullAccount | undefined>;
  formAccountAfterConfirmation: (fullAccount: FullAccount) => Promise<void>;
  removeAccount: () => void;
};
