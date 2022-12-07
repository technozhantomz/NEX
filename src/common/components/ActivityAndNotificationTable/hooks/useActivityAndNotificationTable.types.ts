import { Dispatch, SetStateAction } from "react";

import { ActivityRow, Notification } from "../../../types";
import { ActivityAndNotificationType } from "../components";

export type UseActivityAndNotificationResult = {
  activitiesAndNotificationsRows: ActivityRow[];
  loading: boolean;
  activityAndNotificationColumns: ActivityAndNotificationType[];
  searchDataSource: ActivityRow[];
  setSearchDataSource: Dispatch<SetStateAction<ActivityRow[]>>;
};

export type UseActivityAndNotificationTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
  isNotificationTab: boolean;
  notifications: Notification[];
  markTheNotificationAsReadOrUnread: (id: string, unread: boolean) => void;
};
