import { Asset } from "../../../../../common/types";

export type UsePairSelectResult = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loading: boolean;
};
