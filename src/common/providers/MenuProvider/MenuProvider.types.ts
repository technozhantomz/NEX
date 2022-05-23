export type MenuProviderContextType = {
  openMenu: (menuName: string) => void;
  closeMenu: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
};
