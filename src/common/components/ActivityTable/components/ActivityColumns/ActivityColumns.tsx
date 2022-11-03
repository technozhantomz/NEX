import { TableHeading } from "../../../";
import { UserLinkExtractor } from "../../../UserLinkExtractor";
import { ActivityTag } from "../ActivityTag";

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
    render: (value: string): JSX.Element => (
      <UserLinkExtractor infoString={value} />
    ),
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
];
