import { ActivityRow } from "../../types";

export type MenuProviderContextType = {
  toggleMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
  unreadMessages: boolean;
  notifications: Notifications;
};

export type Notifications = {
  notificationRows: NotificationRow[];
};

export type NotificationRow = {
  notificationRow: ActivityRow;
  unread: boolean;
};
