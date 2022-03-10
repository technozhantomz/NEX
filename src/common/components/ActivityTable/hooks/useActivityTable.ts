import { useCallback, useEffect, useState } from "react";

import { useAsset, useHistory } from "../../../hooks";
import { usePeerplaysApiContext } from "../../PeerplaysApiProvider";
import { useUserContext } from "../../UserProvider";

import { ActivityRow, UseActivityTable } from "./useActivityTable.types";

export function useActivityTable(): UseActivityTable {
  const [tableActivity, _setTableActivity] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();
  const { getAssetById, setPrecision } = useAsset();
  const { getHistoryById, getOperationType } = useHistory();
  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Price (kbyte)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Info",
      dataIndex: "info",
      key: "info",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
    },
  ];

  useEffect(() => {
    setTableActivity();
  }, [id]);

  const formDate = (
    date: string | number | Date,
    pattern = ["date", "month", "year"]
  ): string => {
    const newDate = String(new Date(date)).split(" ");
    const dateObj = {
      date: newDate[2],
      month: newDate[1],
      year: newDate[3],
      time: newDate[4],
    };
    return pattern.map((el) => dateObj[el]).join(" ");
  };

  const formActivityRow = useCallback(
    async (activity): Promise<ActivityRow> => {
      console.log(activity);
      const fee = activity.op[1].fee;
      const time = await dbApi("get_block_header", [activity.block_num]).then(
        (block: { timestamp: any }) => formDate(block.timestamp)
      );
      //const { type, info } = await formInfoColumn(id, el);
      const type = getOperationType(id, activity);
      const feeAsset = await getAssetById(fee.asset_id);
      return {
        key: activity.id,
        time,
        price: type,
        info: "",
        id: activity.id,
        fee: `${await setPrecision(false, fee.amount, feeAsset.precision)} ${
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
      console.log(activityRows);
      _setTableActivity(activityRows);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }

    console.log(history);
    return [];
  }, [tableActivity, formActivityRow, _setTableActivity, setLoading, id]);

  return { tableActivity, loading, columns };
}
