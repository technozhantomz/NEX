export type UseFeesTab = {
  loading: boolean;
  genFeesTableData: FeesTableRow[];
  assetFeesTableData: FeesTableRow[];
  accountFeesTableData: FeesTableRow[];
  bizFeesTableData: FeesTableRow[];
  gameFeesTableData: FeesTableRow[];
};

export type FeesTableRow = {
  operation: string;
  type: string;
  fee: string;
};
