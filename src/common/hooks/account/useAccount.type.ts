import { IAccountData, IFullAccount } from "../../types";

export type UseAccountResult = {
  getFullAccount: (
    name: string,
    subscription: boolean
  ) => Promise<IFullAccount | undefined>;
  getSidechainAccounts: (accountId: string) => Promise<unknown[] | undefined>;
  formAccount: (
    data: IFullAccount
  ) => Promise<Partial<IAccountData> | undefined>;
  getUserName: (id: string) => Promise<string> | undefined;
};
