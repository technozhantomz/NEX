import { FeeParameter } from "../../../../../common/types";

export type UseFeesTabResult = {
  loading: boolean;
  generalFeesRows: FeesTableRow[];
  assetFeesRows: FeesTableRow[];
  accountFeesRows: FeesTableRow[];
  businessFeesRows: FeesTableRow[];
  gameFeesRows: FeesTableRow[];
  marketFeesRows: FeesTableRow[];
};

export type FeesTableRow = {
  key: string;
  operation: string;
  types: string[];
  fees: string[];
};

export type OperationWithFeeParameter = {
  type: string;
  feeParameter: FeeParameter;
};
