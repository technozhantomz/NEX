import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useViewportContext } from "..";
import { breakpoints } from "../../../ui/src/breakpoints";

import { MenuProviderContextType } from "./MenuProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultMenuState: MenuProviderContextType = {
  openMenu: function (): void {
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

  const { width } = useViewportContext();

  const openMenu = useCallback(
    (menuName: string) => {
      switch (true) {
        case menuName === "notify":
          setProfileMenuOpen(false);
          setMainMenuOpen(false);
          setNotificationMenuOpen(true);
          break;
        case menuName === "profile":
          setNotificationMenuOpen(false);
          setMainMenuOpen(false);
          setProfileMenuOpen(true);
          break;
        case menuName === "main":
          setNotificationMenuOpen(false);
          setProfileMenuOpen(false);
          setMainMenuOpen(true);
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

  useEffect(() => {
    if (width > breakpoints.sm) {
      document.addEventListener("click", closeMenu);
      return () => {
        document.removeEventListener("click", closeMenu);
      };
    }
  }, [width]);

  return (
    <MenuProviderContext.Provider
      value={{
        notificationMenuOpen,
        profileMenuOpen,
        mainMenuOpen,
        openMenu,
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
