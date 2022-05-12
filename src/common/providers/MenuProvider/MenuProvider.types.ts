import { ActivityRow } from "../../components/PageLayout/TopBar/components/NotificationMenu/Notifications/hooks/useNotification.types";

export type MenuProviderContextType = {
  toggleMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
  notifications: Notification[];
};

export type Notification = {
  notificationRow: ActivityRow;
  unread: boolean;
};
