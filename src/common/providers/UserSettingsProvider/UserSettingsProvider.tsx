import React, { createContext, useContext, useEffect, useState } from "react";

import { useSettingsContext, useUserContext } from "..";
import { CheckboxValueType } from "../../../ui/src";
import { useActivity, useFormDate, useLocalStorage } from "../../hooks";
import { Notification } from "../../types";

type UserSettingsContextType = {
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
  const { chainId, settings } = useSettingsContext();

  const [notifications, setNotifications] = useLocalStorage(
    `${chainId.slice(0, 8)}_notifications_${localStorageAccount}`
  ) as [Notification[], (value: Notification[]) => void];
  const [hasUnreadMessages, _setHasUnreadMessages] = useState<boolean>(false);
  const [loadingNotifications, setLoadingNotifications] =
    useState<boolean>(true);
  const [serverCheckedValues, setServerCheckedValues] = useState<
    CheckboxValueType[]
  >([]);
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

      const serverActivities = (
        await getActivitiesRows(localStorageAccount, false)
      ).filter((e) => serverCheckedValues.includes(e.type));

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

  useEffect(() => {
    setServerCheckedValues(settings.notifications.selectedNotifications);
    if (localStorageAccount && localStorageAccount !== "") {
      updateNotifications();
    } else {
      setNotifications(null);
    }
  }, [
    localStorageAccount,
    settings,
    setServerCheckedValues,
    serverCheckedValues,
  ]);

  return (
    <userSettingsContext.Provider
      value={{
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
