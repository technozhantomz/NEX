import { Notification } from "../../types";

export type MenuProviderContextType = {
  openMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
  hasUnreadMessages: boolean;
  notifications: Notification[];
  loadingNotifications: boolean;
  markAllNotificationsRead: () => void;
  markTheNotificationAsReadOrUnread: (id: string, unread: boolean) => void;
};
