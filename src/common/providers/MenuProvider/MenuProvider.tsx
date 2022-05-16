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

  const { width } = useViewportContext();

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

  useEffect(() => {
    // This should fixed with mobile menu
    if (width > breakpoints.xs) {
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
