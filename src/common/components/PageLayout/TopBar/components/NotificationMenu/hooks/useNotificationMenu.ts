import { useCallback, useEffect, useState } from "react";

import { Notification } from "../../../../../../types";

import { UseNotificationMenuResult } from "./useNotificationMenu.types";

type Props = {
  notifications: Notification[];
  loadingNotifications: boolean;
};

export function useNotificationMenu({
  notifications,
  loadingNotifications,
}: Props): UseNotificationMenuResult {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);
  const [todayNotifications, setTodayNotifications] = useState<Notification[]>(
    []
  );
  const [yesterdayNotifications, setYesterdayNotifications] = useState<
    Notification[]
  >([]);
  const [thirdClusterNotifications, setThirdClusterNotifications] = useState<
    Notification[]
  >([]);

  const clusterNotificationsByDate = useCallback(() => {
    if (!loadingNotifications && notifications) {
      setTodayNotifications(
        notifications.filter(
          (notification) =>
            new Date(notification.activity.time).toDateString() ===
            today.toDateString()
        )
      );
      setYesterdayNotifications(
        notifications.filter(
          (notification) =>
            new Date(notification.activity.time).toDateString() ===
            yesterday.toDateString()
        )
      );
      const olderNotifications = notifications.filter(
        (notification) =>
          new Date(notification.activity.time).toDateString() !==
            yesterday.toDateString() &&
          new Date(notification.activity.time).toDateString() !==
            today.toDateString()
      );
      const thirdClusterTime =
        olderNotifications.length > 0
          ? olderNotifications[0].activity.time
          : "";
      if (thirdClusterTime !== "") {
        const thirdClusterNotifications = notifications.filter(
          (notification) =>
            new Date(notification.activity.time).toDateString() ===
            new Date(thirdClusterTime).toDateString()
        );
        setThirdClusterNotifications(thirdClusterNotifications);
      }
    }
  }, [
    notifications,
    notifications && notifications.length,
    loadingNotifications,
    setTodayNotifications,
    setYesterdayNotifications,
    setThirdClusterNotifications,
  ]);

  useEffect(() => {
    clusterNotificationsByDate();
  }, [clusterNotificationsByDate]);

  return {
    showUnreadOnly,
    setShowUnreadOnly,
    todayNotifications,
    yesterdayNotifications,
    thirdClusterNotifications,
  };
}
