import { History } from "../../types";

export type UseAccountHistoryResult = {
  getAccountHistoryById: (id: string) => Promise<History[]>;
};
