export interface ActivityRow {
  key: string;
  time: string;
  type: string;
  info: string;
  id: string;
  fee: string;
}

export type UseActivityTableResult = {
  activitiesTable: ActivityRow[];
  loading: boolean;
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
};
