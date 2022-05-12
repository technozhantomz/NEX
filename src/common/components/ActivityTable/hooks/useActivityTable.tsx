import { useCallback, useEffect, useState } from "react";

import { useAccount, useAccountHistory, useActivity } from "../../../hooks";
import { useUserContext } from "../../../providers";
import { ActivityRow } from "../../../types";

import {
  UseActivityTableArgs,
  UseActivityTableResult,
} from "./useActivityTable.types";

export function useActivityTable({
  userName,
}: UseActivityTableArgs): UseActivityTableResult {
  const [activitiesRows, _setActivitiesRows] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useUserContext();
  const { getAccountByName } = useAccount();
  const { getAccountHistoryById } = useAccountHistory();
  const { getActivitiesRows } = useActivity();

  const setActivitiesRows = useCallback(async () => {
    try {
      const activityRows = await getActivitiesRows(userName as string);
      _setActivitiesRows(activityRows);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [
    setLoading,
    id,
    getAccountHistoryById,
    _setActivitiesRows,
    getAccountByName,
    userName,
  ]);

  useEffect(() => {
    setActivitiesRows();
  }, [id, userName]);

  return { activitiesRows, loading };
}
