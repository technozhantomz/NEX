export type UseSidechainAccounts = {
  getSidechainAccounts: (accountId: string) => Promise<unknown[] | undefined>;
};
