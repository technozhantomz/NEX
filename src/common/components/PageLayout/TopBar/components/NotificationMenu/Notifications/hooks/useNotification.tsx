import { useCallback, useEffect, useState } from "react";

import { isArrayEqual } from "../../../../../../../../api/utils";
import {
  useAccount,
  useAccountHistory,
  useActivity,
  useAsset,
} from "../../../../../../../hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
  useViewportContext,
} from "../../../../../../../providers";

import {
  ActivityRow,
  UseActivityTableArgs,
  UseActivityTableResult,
} from "./useNotification.types";

export function useNotification({
  userName,
}: UseActivityTableArgs): UseActivityTableResult {
  const [unread, setUnread] = useState<ActivityRow[]>([]);
  const [showUnread, setShowUnread] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<ActivityRow[]>([]);
  const [activitiesTable, _setActivitiesTable] = useState<ActivityRow[]>([]);
  const [recentActivitiesTable, _setRecentActivitiesTable] = useState<
    ActivityRow[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useUserContext();
  const { getAccountByName } = useAccount();
  const { getAccountHistoryById } = useAccountHistory();
  const { getActivitiesRows } = useActivity();

  const setActivitiesTable = useCallback(async () => {
    try {
      setLoading(true);

      const activityRows = await getActivitiesRows(userName as string);
      _setActivitiesTable(activityRows);
      _setRecentActivitiesTable(activityRows.slice(0, 5));

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [
    setLoading,
    id,
    getAccountHistoryById,
    _setActivitiesTable,
    getAccountByName,
    userName,
  ]);

  const handleShowUnread = () => {
    setShowUnread(!showUnread);
  };

  const handleNotifications = useCallback(async () => {
    const activityList = JSON.parse(localStorage.getItem("activityList"));

    if (isArrayEqual(activityList, activitiesTable)) {
      localStorage.setItem("activityList", JSON.stringify(activitiesTable));
    } else {
      setUnread(
        activitiesTable.filter(
          (activity) => activityList?.indexOf(activity) === -1
        )
      );
    }
    setUnreadMessages(
      activitiesTable.filter((obj) =>
        activityList.some(({ id }) => obj.id === id)
      )
    );
  }, [unread, activitiesTable]);

  useEffect(() => {
    setActivitiesTable();
    handleNotifications();
  }, [id, userName, activitiesTable, showUnread]);

  return {
    activitiesTable,
    loading,
    recentActivitiesTable,
    unread,
    showUnread,
    handleShowUnread,
    unreadMessages,
  };
}
