export interface ActivityRow {
  key: string;
  time: string;
  price: string;
  info: unknown;
  id: string;
  fee: string;
}

export type UseActivityTable = {
  tableActivity: ActivityRow[];
  loading: boolean;
};
