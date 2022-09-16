import { TableHeading } from "../../../../common/components";
import { Tag } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

import { FeesTableRow } from "./hooks";

const headings = ["category", "operation", "fee_type", "standard_fee"];
const keys = ["category", "operation", "types", "fees"];
const renders = [
  (category: string): JSX.Element => (
    <>
      <div>{category}</div>
    </>
  ),
  (operation: string): JSX.Element => (
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
  (types: string[], record: FeesTableRow): JSX.Element => (
    <>
      {types.map((type, index) => (
        <div key={`${record.key}-${index}`}>{type}</div>
      ))}
    </>
  ),
  (fees: string[], record: FeesTableRow): JSX.Element => (
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
];
const filters = [
  [
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
  undefined,
  undefined,
  undefined,
];
const filterModes = ["menu", undefined, undefined, undefined];
const filterSearch = [false, undefined, undefined, undefined];
const onFilters = [
  (value: string, record: FeesTableRow): boolean =>
    record.category.includes(value),
  undefined,
  undefined,
  undefined,
];
const sorters = [
  undefined,
  undefined,
  undefined,
  (a: { fees: string }, b: { fees: string }) =>
    parseFloat(a.fees === "Free of Charge" ? "0" : a.fees) -
    parseFloat(b.fees === "Free of Charge" ? "0" : b.fees),
];

export const FeesColumns = headings.map((heading, index) => {
  return {
    title: (): JSX.Element => <TableHeading heading={heading} />,
    dataIndex: keys[index],
    key: keys[index],
    render: renders[index],
    filters: filters[index],
    filterMode: filterModes[index],
    filterSearch: filterSearch[index],
    onFilter: onFilters[index],
    sorter: sorters[index],
  };
});
