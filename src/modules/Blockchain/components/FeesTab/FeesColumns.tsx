import { TableHeading } from "../../../../common/components";
import { Tag } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

import { FeesTableRow } from "./hooks";

export const FeesColumns = [
  {
    title: (): JSX.Element => <TableHeading heading={"category"} />,
    dataIndex: "category",
    key: "category",
    render: (category: string): JSX.Element => (
      <>
        <div>{category}</div>
      </>
    ),
    filters: [
      {
        text: "General",
        value: "General",
      },
      {
        text: "Asset Specific",
        value: "Asset Specific",
      },
      {
        text: "Account Specific",
        value: "Account Specific",
      },
      {
        text: "Market Specific",
        value: "Market Specific",
      },
      {
        text: "Business Administration",
        value: "Business Administration",
      },
      {
        text: "Game Specific",
        value: "Game Specific",
      },
    ],
    filterMode: "tree",
    filterSearch: false,
    onFilter: (value: string, record: FeesTableRow): boolean =>
      record.category.includes(value),
  },
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
    render: (types: string[], record: FeesTableRow): JSX.Element => (
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
    render: (fees: string[], record: FeesTableRow): JSX.Element => (
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
