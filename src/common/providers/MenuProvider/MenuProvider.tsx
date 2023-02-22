import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useBrowserHistoryContext, useViewportContext } from "..";
import { breakpoints } from "../../../ui/src/breakpoints";

import { MenuContextType } from "./MenuProvider.types";

interface Props {
  children: React.ReactNode;
}

const DefaultMenuState: MenuContextType = {
  openMenu: function (): void {
    throw new Error(`Function not implemented.`);
  },
  closeAllMenus: function (): void {
    throw new Error(`Function not implemented.`);
  },

  notificationMenuOpen: false,
  profileMenuOpen: false,
  mainMenuOpen: false,
};

const MenuContext = createContext<MenuContextType>(DefaultMenuState);

export const MenuProvider = ({ children }: Props): JSX.Element => {
  const [notificationMenuOpen, setNotificationMenuOpen] =
    useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);

  const { browserHistory } = useBrowserHistoryContext();
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

  const closeAllMenus = useCallback(() => {
    setNotificationMenuOpen(false);
    setProfileMenuOpen(false);
    setMainMenuOpen(false);
  }, [setNotificationMenuOpen, setProfileMenuOpen, setMainMenuOpen]);

  useEffect(() => {
    if (width > breakpoints.sm) {
      document.addEventListener("click", closeAllMenus);
      return () => {
        document.removeEventListener("click", closeAllMenus);
      };
    }
  }, [width]);

  useEffect(() => {
    closeAllMenus();
  }, [browserHistory]);

  const context = useMemo(() => {
    return {
      notificationMenuOpen,
      profileMenuOpen,
      mainMenuOpen,
      openMenu,
      closeAllMenus,
    };
  }, [
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
    openMenu,
    closeAllMenus,
  ]);

  return (
    <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
  );
};

export const useMenuContext = (): MenuContextType => {
  return useContext<MenuContextType>(MenuContext);
};
