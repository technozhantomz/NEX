//import Link from "next/link";

//import { ActivityRow } from "../../hooks/useActivityTable.types";
import { ActivityTag } from "../ActivityTag";

export const ActivityColumns = [
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type: string): JSX.Element => <ActivityTag type={type} />,
  },
  {
    title: "Info",
    dataIndex: "info",
    key: "info",
    render: (_value: unknown): JSX.Element => (
      // <Link href={"/"}>{_value}</Link>
      <span>{_value}</span>
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
