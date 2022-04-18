export interface ActivityRow {
  key: string;
  time: string;
  type: string;
  info: JSX.Element;
  id: string;
  fee: string;
}

export type UseActivityTable = {
  activitiesTable: ActivityRow[];
  loading: boolean;
};
