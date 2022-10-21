import counterpart from "counterpart";

import { TableHeading } from "../../../../common/components";
import { AssetActionButton } from "../AssetActionButton";

const headings = [
  "asset",
  "available",
  "quote_asset",
  "price",
  "change",
  "volume",
  "transfer",
];
const keys = [
  "asset",
  "available",
  "quoteAsset",
  "price",
  "change",
  "volume",
  "transfer",
];
const renders = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  (_value: any, record: any) => (
    <AssetActionButton
      txt={counterpart.translate(`transaction.trxTypes.transfer.title`)}
      href={`/wallet/${record.asset}?tab=transfer`}
    />
  ),
];
const filters = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterModes = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterSearch = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const onFilters = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const sorters = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export const AssetsTabColumns = headings.map((heading, index) => {
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
