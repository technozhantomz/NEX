import { ActivityRow } from "./Account";

export type Notifications = {
  notificationRows: NotificationRow[];
};

export type NotificationRow = {
  notificationRow: ActivityRow;
  unread: boolean;
};
