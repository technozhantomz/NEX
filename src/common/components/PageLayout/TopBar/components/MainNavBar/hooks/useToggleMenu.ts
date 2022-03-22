import { useCallback, useState } from "react";

import { UseToggleMenuResult } from "./useToggleMenu.types";

export function useToggleMenu(): UseToggleMenuResult {
  const [notificationMenuOpen, setNotificationMenuOpen] =
    useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback(
    (menuName: string) => {
      switch (true) {
        case menuName === "notify":
          setNotificationMenuOpen(notificationMenuOpen ? false : true);
          setProfileMenuOpen(false);
          setMainMenuOpen(false);
          break;
        case menuName === "profile":
          setProfileMenuOpen(profileMenuOpen ? false : true);
          setNotificationMenuOpen(false);
          setMainMenuOpen(false);
          break;
        case menuName === "main":
          setMainMenuOpen(mainMenuOpen ? false : true);
          setNotificationMenuOpen(false);
          setProfileMenuOpen(false);
          break;
      }
    },
    [setNotificationMenuOpen, setProfileMenuOpen, setMainMenuOpen]
  );

  const closeMenu = useCallback(() => {
    setNotificationMenuOpen(false);
    setProfileMenuOpen(false);
    setMainMenuOpen(false);
  }, [setNotificationMenuOpen, setProfileMenuOpen, setMainMenuOpen]);

  return {
    toggleMenu,
    closeMenu,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  };
}
