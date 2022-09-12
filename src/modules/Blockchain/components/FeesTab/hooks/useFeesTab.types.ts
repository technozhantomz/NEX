import { FeeParameter } from "../../../../../common/types";

export type UseFeesTabResult = {
  loading: boolean;
  generalFeesRows: FeesTableRow[];
  assetFeesRows: FeesTableRow[];
  accountFeesRows: FeesTableRow[];
  businessFeesRows: FeesTableRow[];
  gameFeesRows: FeesTableRow[];
  marketFeesRows: FeesTableRow[];
  searchValue: string;
  handleSearch: (name: string) => void;
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
