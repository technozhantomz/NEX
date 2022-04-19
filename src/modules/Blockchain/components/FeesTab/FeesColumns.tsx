import { Tag } from "../../../../ui/src";

export const FeesColumns = [
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
    render: (operation: string): JSX.Element => (
      <>{operation === "" ? "" : <Tag key={operation}>{operation}</Tag>}</>
    ),
  },
  {
    title: "Fee Type",
    dataIndex: "types",
    key: "types",
    render: (types: string[], record: any): JSX.Element => (
      <>
        {types.map((type, index) => (
          <div key={`${record.key}-${index}`}>{type}</div>
        ))}
      </>
    ),
  },
  {
    title: "Standard Fee",
    dataIndex: "fees",
    key: "fees",
    render: (fees: string[], record: any): JSX.Element => (
      <>
        {fees.map((fee, index) => (
          <div
            className="standard-fee"
            key={`${record.key}-${fees.length + index}`}
          >
            {fee}
          </div>
        ))}
      </>
    ),
  },
];
