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
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(false);
  const [groupedNotificationsByDate, setGroupedNotificationsByDate] = useState<{
    [time: string]: Notification[];
  }>({});

  const clusterNotificationsByDate = useCallback(() => {
    if (!loadingNotifications && notifications && notifications.length) {
      const groupedNotificationsByDate = notifications.reduce(
        (previousValue, currentValue) => {
          const time = new Date(currentValue.activity.time).toDateString();

          const repeatedTimeIndex = Object.keys(previousValue).findIndex(
            (key) => key === time
          );
          if (!showUnreadOnly || currentValue.unread) {
            if (repeatedTimeIndex === -1) {
              previousValue[time] = [] as Notification[];
              previousValue[time].push(currentValue);
            } else {
              previousValue[time].push(currentValue);
            }
          }
          return previousValue;
        },
        {} as {
          [time: string]: Notification[];
        }
      );
      setGroupedNotificationsByDate(groupedNotificationsByDate);
    } else {
      setGroupedNotificationsByDate({});
    }
  }, [
    notifications,
    notifications && notifications.length,
    loadingNotifications,
    setGroupedNotificationsByDate,
    showUnreadOnly,
  ]);

  useEffect(() => {
    clusterNotificationsByDate();
  }, [clusterNotificationsByDate]);

  return {
    showUnreadOnly,
    setShowUnreadOnly,
    groupedNotificationsByDate,
  };
}
