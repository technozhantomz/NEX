import { TableHeading } from "../../../../common/components/TableHeading";
import { Tag } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const FeesColumns = [
  {
    title: (): JSX.Element => <TableHeading heading={"operation"} />,
    dataIndex: "operation",
    key: "operation",
    render: (operation: string): JSX.Element => (
      <>
        {operation === "" ? (
          ""
        ) : (
          <Tag key={operation} bgColor={colors.assetTag}>
            {operation}
          </Tag>
        )}
      </>
    ),
  },
  {
    title: (): JSX.Element => <TableHeading heading={"fee_type"} />,
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
    title: (): JSX.Element => <TableHeading heading={"standard_fee"} />,
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
