import { IAccountData, IFullAccount, ISignupFormData } from "../../types";

export type UseAccountResult = {
  getFullAccount: (
    name: string,
    subscription: boolean
  ) => Promise<IFullAccount>;
  getAccountByName: (name: string) => Promise<IAccountData>;
  getSidechainAccounts: (accountId: string) => Promise<unknown[]>;
  formAccount: (data: IFullAccount) => Promise<IAccountData>;
  formPrivateKey: (password: string, role: string) => Promise<string>;
  createAccount: (data: ISignupFormData) => Promise<IAccountData>;
};
