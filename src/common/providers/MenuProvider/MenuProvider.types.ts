import { Notifications } from "../../types";

export type MenuProviderContextType = {
  toggleMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
  unreadMessages: boolean;
  notifications: Notifications;
};
