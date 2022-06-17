import { Dispatch, SetStateAction } from "react";

export type UseNotificationMenuResult = {
  showUnreadOnly: boolean;
  setShowUnreadOnly: Dispatch<SetStateAction<boolean>>;
};
