import { ActivityTag } from "../ActivityTag";
import { AvtivityInfo } from "../AvtivityInfo";

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
    render: (value: string): JSX.Element => <AvtivityInfo infoString={value} />,
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
