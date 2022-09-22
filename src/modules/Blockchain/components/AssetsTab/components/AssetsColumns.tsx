import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../common/components";
import { InfoCircleOutlined, Tag, Tooltip } from "../../../../../ui/src";
import { colors } from "../../../../../ui/src/colors";
// import { useAssetsTab } from "../hooks";
import { AssetTableRow } from "../hooks/useAssetsTab.types";

const headings = [
  "id",
  "symbol",
  // "name",
  "max_supply",
  "precision",
  "issuer",
  "info",
];
const keys = [
  "id",
  "symbol",
  // "name",
  "maxSupply",
  "precision",
  "issuer",
  "info",
];
const renders = [
  undefined,
  (symbol: string): JSX.Element => (
    <Tag key={symbol} bgColor={colors.assetTag}>
      {symbol}
    </Tag>
  ),
  // undefined,
  undefined,
  undefined,
  (issuer: string): JSX.Element => (
    <Link href={`/user/${issuer}`}>{issuer}</Link>
  ),
  (info: string): JSX.Element => {
    if (!info || info === "") {
      return <span>{counterpart.translate(`field.labels.not_available`)}</span>;
    } else {
      return (
        <Tooltip placement="top" title={info}>
          <InfoCircleOutlined />
        </Tooltip>
      );
    }
  },
];
const filters = [
  undefined,
  undefined,
  // undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterModes = [
  "menu",
  undefined,
  // undefined,
  undefined,
  undefined,
  "menu",
  undefined,
];
const filterSearch = [
  true,
  undefined,
  // undefined,
  undefined,
  undefined,
  true,
  undefined,
];
const onFilters = [
  (value: string, record: AssetTableRow): boolean =>
    record.symbol.includes(value),
  undefined,
  // undefined,
  undefined,
  undefined,
  (value: string, record: AssetTableRow): boolean =>
    record.issuer.includes(value),
  undefined,
];
const sorters = [
  (a: { id: string }, b: { id: string }) =>
    parseInt(a.id.charAt(a.id.length - 1)) -
    parseInt(b.id.charAt(b.id.length - 1)),
  undefined,
  // undefined,
  (a: { maxSupply: number }, b: { maxSupply: number }) =>
    a.maxSupply - b.maxSupply,
  (a: { precision: number }, b: { precision: number }) =>
    a.precision - b.precision,
  undefined,
  undefined,
];

export const AssetsColumns = headings.map((heading, index) => {
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
