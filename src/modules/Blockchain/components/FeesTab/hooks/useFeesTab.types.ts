import { Dispatch, SetStateAction } from "react";

import { FeeParameter } from "../../../../../common/types";

export type UseFeesTabResult = {
  searchDataSource: FeesTableRow[];
  fullFeesRows?: FeesTableRow[];
  setSearchDataSource: Dispatch<SetStateAction<FeesTableRow[]>>;
};

export type FeesTableRow = {
  key: string;
  category: string;
  operation: string;
  types: string[];
  fees: string[];
};

export type OperationWithFeeParameter = {
  type: string;
  feeParameter: FeeParameter;
};
