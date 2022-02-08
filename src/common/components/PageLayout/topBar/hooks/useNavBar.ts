import { useState } from "react";

import { IMenus, INavBarMenu } from "./useNaveBar.type";

const defaultMenus = {
  main: {
    name: "main",
    className: "main-menu-wrapper",
    open: false,
  },
  profile: {
    name: "profile",
    className: "profile-wrapper",
    open: false,
  },
  notify: {
    name: "notify",
    className: "notification-menu-wrapper",
    open: false,
  },
};

export function useNavBar(): INavBarMenu {
  const [menus, setMenus] = useState<IMenus>(defaultMenus);

  const toggleMenu = (menu: string): void => {
    const newMenus = defaultMenus;
    if (menu === "main") newMenus.main.open = menus.main.open ? false : true;
    if (menu === "profile") newMenus.main.open = menus.main.open ? false : true;
    if (menu === "notify") newMenus.main.open = menus.main.open ? false : true;
    setMenus(newMenus);
  };

  const closeMenu = (): void => {
    setMenus(defaultMenus);
  };

  return {
    menus,
    toggleMenu,
    closeMenu,
  };
}
