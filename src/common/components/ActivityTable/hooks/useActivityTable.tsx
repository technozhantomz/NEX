import { useCallback, useEffect, useState } from "react";

import { useActivity } from "../../../hooks";

import {
  ActivityRow,
  UseActivityTableArgs,
  UseActivityTableResult,
} from "./useActivityTable.types";

export function useActivityTable({
  userName,
  isWalletActivityTable = false,
}: UseActivityTableArgs): UseActivityTableResult {
  const [activitiesRows, _setActivitiesRows] = useState<ActivityRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { getActivitiesRows } = useActivity();

  const setActivitiesRows = useCallback(async () => {
    try {
      setLoading(true);
      const activityRows = await getActivitiesRows(
        userName as string,
        isWalletActivityTable
      );
      _setActivitiesRows(activityRows);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [setLoading, _setActivitiesRows, isWalletActivityTable, userName]);

  useEffect(() => {
    setActivitiesRows();
  }, [userName]);

  return { activitiesRows, loading };
}
