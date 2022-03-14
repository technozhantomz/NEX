import { useCallback, useEffect, useState } from "react";

import { breakpoints } from "../../../../ui/src/breakpoints";
import { useAsset, useHistory } from "../../../hooks";
import { usePeerplaysApiContext } from "../../PeerplaysApiProvider";
import { useUserContext } from "../../UserProvider";
import { useViewportContext } from "../../ViewportProvider";

import { ActivityRow, UseActivityTable } from "./useActivityTable.types";

export function useActivityTable(): UseActivityTable {
  const [tableActivity, _setTableActivity] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();
  const { width } = useViewportContext();
  const { getAssetById, setPrecision } = useAsset();
  const { getHistoryById, getOperationInfo } = useHistory();

  useEffect(() => {
    setTableActivity();
  }, [id]);

  const formDate = (
    date: string | number | Date,
    pattern = ["day", "month", "date", "year"]
  ): string => {
    const newDate = String(new Date(date)).split(" ");
    const dateObj = {
      day: newDate[0] + ",",
      date: newDate[2],
      month: newDate[1],
      year: newDate[3],
      time: newDate[4],
    };
    if (width > breakpoints.sm) return String(date).replace("T", " ");
    return pattern.map((el) => dateObj[el]).join(" ") + " | "  + dateObj.time;
  };

  const formActivityRow = useCallback(
    async (activity): Promise<ActivityRow> => {
      const fee = activity.op[1].fee;
      const time = await dbApi("get_block_header", [activity.block_num]).then(
        (block: { timestamp: any }) => formDate(block.timestamp)
      );
      const info = await getOperationInfo(id, activity);
      const feeAsset = await getAssetById(fee.asset_id);
      return {
        key: activity.id,
        time,
        price: info.type,
        info: info.infoString,
        id: activity.id,
        fee: `${setPrecision(false, fee.amount, feeAsset.precision)} ${
          feeAsset.symbol
        }`,
      };
    },
    []
  );

  const setTableActivity = useCallback(async () => {
    let history = await getHistoryById(id);
    history = history.filter(
      (el: { op: number[] }) =>
        (el.op[0] >= 0 && el.op[0] <= 8) ||
        el.op[0] === 34 ||
        el.op[0] === 10 ||
        el.op[0] === 11 ||
        el.op[0] === 13 ||
        el.op[0] === 14 ||
        el.op[0] === 16
    );
    try {
      setLoading(true);
      const activityRows = await Promise.all(history.map(formActivityRow));
      _setTableActivity(activityRows);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [tableActivity, formActivityRow, _setTableActivity, setLoading, id]);

  return { tableActivity, loading };
}
