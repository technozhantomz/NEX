import { Notification } from "../../types";

export type MenuProviderContextType = {
  openMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
  hasUnreadMessages: boolean;
  notifications: Notification[];
  markAllNotificationsRead: () => void;
  markTheNotificationRead: (id: string) => void;
};
