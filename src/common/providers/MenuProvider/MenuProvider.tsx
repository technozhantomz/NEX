import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { isArrayEqual } from "../../../api/utils";
import { useActivity, useLocalStorage } from "../../hooks";
import { useUserContext } from "../UserProvider";

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
  unreadMessages: false,
  notifications: {
    notificationRows: [],
  },
};

const MenuProviderContext =
  createContext<MenuProviderContextType>(DefaultMenuState);

export const MenuProvider = ({ children }: Props): JSX.Element => {
  const [notificationMenuOpen, setNotificationMenuOpen] =
    useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<boolean>(false);
  const [notifications, _setNotifications] = useLocalStorage(
    "notifications"
  ) as [Notifications, (value: Notification) => void];
  const { localStorageAccount } = useUserContext();
  const { getActivitiesRows } = useActivity();

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

  const initNotifications = useCallback(() => {
    if (!notifications) _setNotifications(DefaultMenuState.notifications);
  }, [notifications, _setNotifications]);

  const setNotifications = useCallback(async () => {
    const activityRows = await getActivitiesRows(localStorageAccount);
    const serverNotifications = activityRows.map((activity) => {
      return {
        notificationRow: activity,
        unread: false,
      };
    });
    if (!isArrayEqual(notifications.notificationRows, serverNotifications)) {
      const unread = serverNotifications.filter(
        (notification) => serverNotifications.indexOf(notification) === -1
      );
      notifications.notificationRows.concat(unread);
      _setNotifications(notifications);
      setUnreadMessages(true);
    }
  }, [localStorageAccount]);

  useEffect(() => {
    setNotifications();
  }, [localStorageAccount, notifications, _setNotifications]);

  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <MenuProviderContext.Provider
      value={{
        notificationMenuOpen,
        profileMenuOpen,
        mainMenuOpen,
        unreadMessages,
        notifications,
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
