export type MenuContextType = {
  openMenu: (menuName: string) => void;
  closeAllMenus: () => void;
  notificationMenuOpen: boolean;
  profileMenuOpen: boolean;
  mainMenuOpen: boolean;
};
