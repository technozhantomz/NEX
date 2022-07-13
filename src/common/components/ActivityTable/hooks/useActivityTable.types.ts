export interface ActivityRow {
  key: string;
  time: string;
  type: string;
  info: string;
  id: string;
  fee: string;
  memo: string;
}

export type UseActivityTableResult = {
  activitiesRows: ActivityRow[];
  loading: boolean;
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
};
