import Link from "next/link";

import { ActivityRow } from "../../hooks/useActivityTable.types";
import { ActivityTag } from "../ActivityTag";

export const ActivityColumns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Price (kbyte)",
    dataIndex: "price",
    key: "price",
    render: (price: string): JSX.Element => <ActivityTag type={price} />,
  },
  {
    title: "Info",
    dataIndex: "info",
    key: "info",
    render: (_value: unknown, record: ActivityRow): JSX.Element => (
      <Link href={"/"}>{_value}</Link>
    ),
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
