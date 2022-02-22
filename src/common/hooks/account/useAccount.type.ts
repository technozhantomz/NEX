import { IAccountData, IFullAccount, ISignupFormData } from "../../types";

export type UseAccountResult = {
  getFullAccount: (
    name: string,
    subscription: boolean
  ) => Promise<IFullAccount | undefined>;
  getAccountByName: () => Promise<unknown> | undefined;
  getSidechainAccounts: (accountId: string) => Promise<unknown[] | undefined>;
  formAccount: (
    data: IFullAccount
  ) => Promise<Partial<IAccountData> | undefined>;
  getUserName: (id: string) => Promise<string> | undefined;
  createAccount: (data: ISignupFormData) => Promise<IAccountData> | undefined;
};
