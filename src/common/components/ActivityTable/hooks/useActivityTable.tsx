import { useCallback, useEffect, useState } from "react";

import { useActivity, useFormDate } from "../../../hooks";
import { useViewportContext } from "../../../providers";
import { ActivityRow } from "../../../types";

import {
  UseActivityTableArgs,
  UseActivityTableResult,
} from "./useActivityTable.types";

export function useActivityTable({
  userName,
  isWalletActivityTable = false,
}: UseActivityTableArgs): UseActivityTableResult {
  const [activitiesRows, setActivitiesRows] = useState<ActivityRow[]>([]);
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
    [sm, convertUTCDateToLocalDate]
  );

  const formActivitiesRows = useCallback(async () => {
    try {
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
      return timeModifiedActivityRows;
    } catch (e) {
      console.log(e);
      return [] as ActivityRow[];
    }
  }, [getActivitiesRows, isWalletActivityTable, userName, formDate]);

  useEffect(() => {
    let ignore = false;

    async function startFormingActivityRows() {
      setLoading(true);
      const _activitiesRows = await formActivitiesRows();
      if (!ignore) {
        setActivitiesRows(_activitiesRows);
        setLoading(false);
      }
    }

    startFormingActivityRows();

    return () => {
      ignore = true;
    };
  }, [userName]);

  return { activitiesRows, loading };
}
