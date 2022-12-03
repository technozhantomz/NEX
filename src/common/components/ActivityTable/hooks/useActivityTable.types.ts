import { Dispatch, SetStateAction } from "react";

import { ActivityRow, Notification } from "../../../types";
import { ActivityColumnType } from "../components";

export type UseActivityTableResult = {
  activitiesRows: ActivityRow[];
  loading: boolean;
  activityColumns: ActivityColumnType[];
  searchDataSource: ActivityRow[];
  setSearchDataSource: Dispatch<SetStateAction<ActivityRow[]>>;
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
  isNotificationTab: boolean;
  notifications: Notification[];
};
