export type INavBarMenu = {
  menus: IMenus;
  toggleMenu: (menu: string) => void;
  closeMenu: () => void;
};

export type IMenus = {
  main: IMenu;
  profile: IMenu;
  notify: IMenu;
};

export type IMenu = {
  name: string;
  className: string;
  open: boolean;
};
