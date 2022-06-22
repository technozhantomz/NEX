import { Dispatch, SetStateAction } from "react";

import { Notification } from "../../../../../../types";

export type UseNotificationMenuResult = {
  showUnreadOnly: boolean;
  setShowUnreadOnly: Dispatch<SetStateAction<boolean>>;
  todayNotifications: Notification[];
  yesterdayNotifications: Notification[];
  thirdClusterNotifications: Notification[];
};
