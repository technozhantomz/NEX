import { useCallback, useState } from "react";

import { UseToggleMenuResult } from "./useToggleMenu.types";

export function useToggleMenu(): UseToggleMenuResult {
  const [notificationMenuOpen, setNotificationMenuOpen] =
    useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);

  const toggleMainMenu = useCallback(() => {
    setMainMenuOpen(mainMenuOpen ? false : true);
    setNotificationMenuOpen(false);
    setProfileMenuOpen(false);
  }, [setMainMenuOpen]);

  const toggleNotificationMenu = useCallback(() => {
    setNotificationMenuOpen(notificationMenuOpen ? false : true);
    setProfileMenuOpen(false);
    setMainMenuOpen(false);
  }, [setNotificationMenuOpen]);

  const toggleProfileMenu = useCallback(() => {
    setProfileMenuOpen(profileMenuOpen ? false : true);
    setNotificationMenuOpen(false);
    setMainMenuOpen(false);
  }, [setProfileMenuOpen]);

  const closeMenu = useCallback(() => {
    setNotificationMenuOpen(false);
    setProfileMenuOpen(false);
    setMainMenuOpen(false);
  }, [setNotificationMenuOpen, setProfileMenuOpen, setMainMenuOpen]);

  return {
    toggleMainMenu,
    toggleNotificationMenu,
    toggleProfileMenu,
    closeMenu,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  };
}
