import { ActivityRow } from "../../../types";
import { ActivityColumnType } from "../components";

export type UseActivityTableResult = {
  activitiesRows: ActivityRow[];
  loading: boolean;
  activityColumns: ActivityColumnType[];
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
};
