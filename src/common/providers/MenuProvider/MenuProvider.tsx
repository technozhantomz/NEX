import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUserContext, useViewportContext } from "..";
import { defaultNotifications } from "../../../api/params";
import { breakpoints } from "../../../ui/src/breakpoints";
import { useActivity, useLocalStorage } from "../../hooks";
import { Notification } from "../../types";

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
  markAllNotificationsRead: function (): void {
    throw new Error(`Function not implemented.`);
  },
  markTheNotificationAsReadOrUnread: function (
    id: string,
    unread: boolean
  ): void {
    throw new Error(
      `Function not implemented. for ${id} notification as ${unread}`
    );
  },
  notificationMenuOpen: false,
  profileMenuOpen: false,
  mainMenuOpen: false,
  hasUnreadMessages: false,
  notifications: defaultNotifications,
  loadingNotifications: true,
};

const MenuProviderContext =
  createContext<MenuProviderContextType>(DefaultMenuState);

export const MenuProvider = ({ children }: Props): JSX.Element => {
  const [notificationMenuOpen, setNotificationMenuOpen] =
    useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [mainMenuOpen, setMainMenuOpen] = useState<boolean>(false);
  const [hasUnreadMessages, _setHasUnreadMessages] = useState<boolean>(false);
  const [notifications, setNotifications] = useLocalStorage(
    "notifications"
  ) as [Notification[], (value: Notification[]) => void];
  const [loadingNotifications, setLoadingNotifications] =
    useState<boolean>(true);

  const { localStorageAccount } = useUserContext();
  const { getActivitiesRows } = useActivity();
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

  const setHasUnreadMessages = (notifications: Notification[]) => {
    for (let index = 0; index < notifications.length; index++) {
      if (notifications[index].unread) {
        _setHasUnreadMessages(true);
        break;
      }
    }
  };

  const markAllNotificationsRead = () => {
    if (notifications && notifications.length > 0) {
      const newNotifications = notifications.map((notification) => {
        return {
          activity: notification.activity,
          unread: false,
        } as Notification;
      });
      setNotifications(newNotifications);
      _setHasUnreadMessages(false);
    }
  };

  const markTheNotificationAsReadOrUnread = (id: string, unread: boolean) => {
    const newNotifications = notifications.map((notification) => {
      if (notification.activity.id === id) {
        return {
          activity: notification.activity,
          unread: unread,
        } as Notification;
      } else {
        return {
          activity: notification.activity,
          unread: notification.unread,
        } as Notification;
      }
    });
    setNotifications(newNotifications);
    setHasUnreadMessages(newNotifications);
  };

  const updateNotifications = async () => {
    const today = new Date();
    const pastThirtyDaysDate = new Date(
      new Date().setDate(today.getDate() - 30)
    );
    try {
      setLoadingNotifications(true);
      const serverActivities = await getActivitiesRows(
        localStorageAccount,
        false
      );
      if (serverActivities) {
        const filteredServerActivities = serverActivities.filter(
          (serverActivity) => new Date(serverActivity.time) > pastThirtyDaysDate
        );
        const serverNotifications = filteredServerActivities.map(
          (serverActivity) => {
            return {
              activity: serverActivity,
              unread: true,
            } as Notification;
          }
        );
        if (!notifications || notifications.length === 0) {
          setNotifications(serverNotifications);
          _setHasUnreadMessages(true);
        } else {
          const filteredLocalNotifications = notifications.filter(
            (notification) =>
              new Date(notification.activity.time) > pastThirtyDaysDate
          );
          if (filteredLocalNotifications.length === 0) {
            setNotifications(serverNotifications);
            _setHasUnreadMessages(true);
          } else {
            const lastUpdateNotificationIndex = serverNotifications.findIndex(
              (serverNotification) =>
                serverNotification.activity.id ===
                filteredLocalNotifications[0].activity.id
            );
            const newNotifications = [
              ...serverNotifications.slice(0, lastUpdateNotificationIndex),
              ...filteredLocalNotifications,
            ];
            setNotifications(newNotifications);
            setHasUnreadMessages(newNotifications);
          }
        }
        setLoadingNotifications(false);
      } else {
        setNotifications([]);
        _setHasUnreadMessages(false);
        setLoadingNotifications(false);
      }
    } catch (e) {
      console.log(e);
      setNotifications([]);
      _setHasUnreadMessages(false);
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    if (localStorageAccount) {
      updateNotifications();
    } else {
      setNotifications([]);
      _setHasUnreadMessages(false);
    }
  }, [localStorageAccount]);

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
        hasUnreadMessages,
        notifications,
        loadingNotifications,
        markAllNotificationsRead,
        markTheNotificationAsReadOrUnread,
      }}
    >
      {children}
    </MenuProviderContext.Provider>
  );
};

export const useMenuContext = (): MenuProviderContextType => {
  return useContext<MenuProviderContextType>(MenuProviderContext);
};
