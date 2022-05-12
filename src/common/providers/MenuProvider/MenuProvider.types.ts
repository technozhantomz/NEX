import { ActivityRow } from "../../types";

export type MenuProviderContextType = {
  toggleMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
  unreadMessages: boolean;
  notifications: Notification[];
};

export type Notification = {
  notificationRow: ActivityRow;
  unread: boolean;
};
