//import Link from "next/link";

//import { ActivityRow } from "../../hooks/useActivityTable.types";
import { ActivityTag } from "../ActivityTag";

import { InfoBlock } from "./InfoBlock/InfoBlock";

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
    render: (value: unknown): JSX.Element => <InfoBlock infoString={value} />,
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
