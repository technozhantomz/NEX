export type MenuProviderContextType = {
  openMenu: (menuName: string) => void;
  closeAllMenus: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
};
