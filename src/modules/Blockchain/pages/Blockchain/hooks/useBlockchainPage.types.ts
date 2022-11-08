import { PageMeta } from "../../../../../common/types";

export type BlockchainPage = {
  pageMeta: PageMeta;
  blockNum: number | undefined;
  transactionId: string | undefined;
};
