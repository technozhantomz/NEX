import { useState } from "react";

import { UseNotificationMenuResult } from "./useNotificationMenu.types";

export function useNotificationMenu(): UseNotificationMenuResult {
  const [showUnreadOnly, setShowUnreadOnly] = useState<boolean>(true);

  return {
    showUnreadOnly,
    setShowUnreadOnly,
  };
}
