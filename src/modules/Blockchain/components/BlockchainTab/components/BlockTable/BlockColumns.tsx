import { TableHeading } from "../../../../../../common/components";

export const BlockColumns = [
  {
    title: (): JSX.Element => <TableHeading heading={"block_id"} />,
    dataIndex: "blockID",
    key: "blockID",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"time"} />,
    dataIndex: "time",
    key: "time",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"witness"} />,
    dataIndex: "witness",
    key: "witness",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"transaction"} />,
    dataIndex: "transaction",
    key: "transaction",
  },
];
