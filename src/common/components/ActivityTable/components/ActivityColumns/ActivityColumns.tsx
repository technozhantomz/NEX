import { TableHeading } from "../../../";
import { ActivityTag } from "../ActivityTag";
import { AvtivityInfo } from "../AvtivityInfo";

export const ActivityColumns = [
  {
    title: (): JSX.Element => <TableHeading heading={"time"} />,
    dataIndex: "time",
    key: "time",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"type"} />,
    dataIndex: "type",
    key: "type",
    render: (type: string): JSX.Element => <ActivityTag type={type} />,
  },
  {
    title: (): JSX.Element => <TableHeading heading={"info"} />,
    dataIndex: "info",
    key: "info",
    render: (value: string): JSX.Element => <AvtivityInfo infoString={value} />,
  },
  {
    title: (): JSX.Element => <TableHeading heading={"id"} />,
    dataIndex: "id",
    key: "id",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"fee"} />,
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"memo"} />,
    dataIndex: "memo",
    key: "memo",
  },
];
