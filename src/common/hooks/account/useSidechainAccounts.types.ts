import { SidechainAcccount } from "../../types";

export type UseSidechainAccounts = {
  hasBTCDepositAddress: boolean;
  getSidechainAccounts: (accountId: string) => Promise<SidechainAcccount[]>;
};
