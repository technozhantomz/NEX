import { useCallback, useEffect, useState } from "react";

import { useActivity, useFormDate } from "../../../hooks";
import { useViewportContext } from "../../../providers";

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
  const { sm } = useViewportContext();
  const { convertUTCDateToLocalDate } = useFormDate();

  const formDate = useCallback(
    (
      date: string | number | Date,
      pattern = ["day", "month", "date", "year"]
    ): string => {
      const localDate = convertUTCDateToLocalDate(new Date(date));
      const newDate = String(localDate).split(" ");
      const dateObj: {
        [segment: string]: string;
      } = {
        day: newDate[0] + ",",
        date: newDate[2],
        month: newDate[1],
        year: newDate[3],
        time: newDate[4],
      };
      if (sm) {
        return (
          pattern.map((el: string) => dateObj[el]).join(" ") +
          " | " +
          dateObj.time
        );
      }

      return `${dateObj.year}-${
        localDate.getMonth() + 1
      }-${localDate.getDate()} ${dateObj.time}`;
    },
    [sm]
  );

  const setActivitiesRows = useCallback(async () => {
    try {
      setLoading(true);
      const activityRows = await getActivitiesRows(
        userName as string,
        isWalletActivityTable
      );
      const timeModifiedActivityRows = activityRows.map((activityRow) => {
        return {
          ...activityRow,
          time: formDate(activityRow.time),
        } as ActivityRow;
      });
      _setActivitiesRows(timeModifiedActivityRows);
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
