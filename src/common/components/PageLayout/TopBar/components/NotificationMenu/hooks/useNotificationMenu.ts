import { useMemo, useState } from "react";

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

  const groupedNotificationsByDate = useMemo(() => {
    if (!loadingNotifications && notifications && notifications.length) {
      const _groupedNotificationsByDate = notifications.reduce(
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
      return _groupedNotificationsByDate;
    } else {
      return {};
    }
  }, [
    notifications,
    notifications && notifications.length,
    loadingNotifications,
    showUnreadOnly,
  ]);

  return {
    showUnreadOnly,
    setShowUnreadOnly,
    groupedNotificationsByDate,
  };
}
