export interface ActivityRow {
  key: string;
  time: string;
  type: string;
  info: string;
  id: string;
  fee: string;
}

export type UseActivityTable = {
  activitiesTable: ActivityRow[];
  loading: boolean;
};
