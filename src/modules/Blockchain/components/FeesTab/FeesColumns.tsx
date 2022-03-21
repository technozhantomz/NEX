import { Tag } from "../../../../ui/src";

export const FeesColumns = [
  {
    title: "Opperation",
    dataIndex: "operation",
    key: "operation",
    render: (operation: string): JSX.Element => (
      <>{operation === "" ? "" : <Tag key={operation}>{operation}</Tag>}</>
    ),
  },
  {
    title: "Fee Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Standard Fee",
    dataIndex: "fee",
    key: "fee",
  },
];
