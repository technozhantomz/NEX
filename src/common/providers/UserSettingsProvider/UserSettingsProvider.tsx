import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUserContext } from "..";
import { defaultUserSettings } from "../../../api/params";
import { useActivity, useFormDate, useLocalStorage } from "../../hooks";
import { Notification, UserSettings } from "../../types";

type UserSettingsContextType = {
  userSettings: UserSettings;
  setUserSettings: (value: UserSettings) => void;
  hasUnreadMessages: boolean;
  notifications: Notification[];
  loadingNotifications: boolean;
  markAllNotificationsRead: () => void;
  markTheNotificationAsReadOrUnread: (id: string, unread: boolean) => void;
};

const userSettingsContext = createContext<UserSettingsContextType>(
  {} as UserSettingsContextType
);

export function useUserSettingsContext(): UserSettingsContextType {
  return useContext(userSettingsContext);
}

export function UserSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const { localStorageAccount } = useUserContext();
  const { getActivitiesRows } = useActivity();
  const { formLocalDate } = useFormDate();

  const [notifications, setNotifications] = useLocalStorage(
    `notifications_${localStorageAccount}`
  ) as [Notification[], (value: Notification[]) => void];
  const [hasUnreadMessages, _setHasUnreadMessages] = useState<boolean>(false);
  const [loadingNotifications, setLoadingNotifications] =
    useState<boolean>(true);
  const [userSettings, setUserSettings] = useLocalStorage(
    `userSettings_${localStorageAccount}`
  ) as [UserSettings, (value: UserSettings) => void];

  const setHasUnreadMessages = (notifications: Notification[]) => {
    for (const notification of notifications) {
      if (notification.unread) {
        _setHasUnreadMessages(true);
        return;
      }
    }
    _setHasUnreadMessages(false);
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
      if (serverActivities && serverActivities.length) {
        const filteredServerActivities = serverActivities.filter(
          (serverActivity) => {
            return (
              new Date(formLocalDate(serverActivity.time)) >= pastThirtyDaysDate
            );
          }
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

  const initUserSettings = useCallback(() => {
    if (localStorageAccount && localStorageAccount !== "" && !userSettings) {
      setUserSettings(defaultUserSettings);
    } else {
      setUserSettings(null);
    }
  }, [userSettings, setUserSettings, localStorageAccount]);

  useEffect(() => {
    initUserSettings();
  }, [localStorageAccount]);

  useEffect(() => {
    if (localStorageAccount && localStorageAccount !== "") {
      updateNotifications();
    } else {
      setNotifications(null);
    }
  }, [localStorageAccount]);

  return (
    <userSettingsContext.Provider
      value={{
        userSettings,
        setUserSettings,
        hasUnreadMessages,
        notifications,
        loadingNotifications,
        markAllNotificationsRead,
        markTheNotificationAsReadOrUnread,
      }}
    >
      {children}
    </userSettingsContext.Provider>
  );
}
