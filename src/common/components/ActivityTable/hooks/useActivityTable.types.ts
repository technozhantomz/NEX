import { ColumnsType } from "antd/lib/table";

export interface ActivityRow {
  key: string;
  time: string;
  price: string;
  info: string;
  id: string;
  fee: string;
}

export type UseActivityTable = {
  tableActivity: ActivityRow[];
  columns: ColumnsType<object>;
  loading: boolean;
};
