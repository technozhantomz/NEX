import React, { createContext, useCallback, useContext, useState } from "react";

import { MenuProviderContextType } from "./MenuProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultMenuState: MenuProviderContextType = {
  toggleMenu: function (): void {
    throw new Error(`Function not implemented.`);
  },
  closeMenu: function (): void {
    throw new Error(`Function not implemented.`);
  },
  notificationMenuOpen: false,
  profileMenuOpen: false,
  mainMenuOpen: false,
};

const MenuProviderContext =
  createContext<MenuProviderContextType>(DefaultMenuState);

export const MenuProvider = ({ children }: Props): JSX.Element => {
  const [notificationMenuOpen, setNotificationMenuOpen] =
    useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(
    (menuName: string) => {
      switch (true) {
        case menuName === "notify":
          setProfileMenuOpen(false);
          setMainMenuOpen(false);
          setNotificationMenuOpen(!notificationMenuOpen);
          break;
        case menuName === "profile":
          setNotificationMenuOpen(false);
          setMainMenuOpen(false);
          setProfileMenuOpen(!profileMenuOpen);
          break;
        case menuName === "main":
          setNotificationMenuOpen(false);
          setProfileMenuOpen(false);
          setMainMenuOpen(!mainMenuOpen);
          break;
      }
    },
    [
      notificationMenuOpen,
      profileMenuOpen,
      mainMenuOpen,
      setNotificationMenuOpen,
      setProfileMenuOpen,
      setMainMenuOpen,
    ]
  );

  const closeMenu = useCallback(() => {
    setNotificationMenuOpen(false);
    setProfileMenuOpen(false);
    setMainMenuOpen(false);
  }, [setNotificationMenuOpen, setProfileMenuOpen, setMainMenuOpen]);
  return (
    <MenuProviderContext.Provider
      value={{
        notificationMenuOpen,
        profileMenuOpen,
        mainMenuOpen,
        toggleMenu,
        closeMenu,
      }}
    >
      {children}
    </MenuProviderContext.Provider>
  );
};

export const useMenuContext = (): MenuProviderContextType => {
  return useContext<MenuProviderContextType>(MenuProviderContext);
};
