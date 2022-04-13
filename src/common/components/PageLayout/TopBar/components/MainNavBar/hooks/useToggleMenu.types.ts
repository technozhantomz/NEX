export type UseToggleMenuResult = {
  toggleMainMenu: () => void;
  toggleNotificationMenu: () => void;
  toggleProfileMenu: () => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
};
