import { PairNameAndMarketStats } from "../../../../../common/types";

export type UseMarketTabResult = {
  pairs: PairNameAndMarketStats[];
  loading: boolean;
};
