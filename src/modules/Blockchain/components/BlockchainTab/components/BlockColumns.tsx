import { TableHeading } from "../../../../../common/components";
import { BlockColumnType, DataTableRow } from "../hooks";

const headings = ["block_id", "time", "witness", "transaction"];
const keys = ["blockID", "time", "witness", "transaction"];
const renders = [
  (blockID: string): JSX.Element => <a>{blockID}</a>,
  undefined,
  (witness: string): JSX.Element => (
    <a href={`/user/${witness}`} target="_blank">
      {witness}
    </a>
  ),
  undefined,
];
const filters = [undefined, undefined, undefined, undefined];
const filterModes = [undefined, undefined, "menu", undefined];
const filterSearch = [undefined, undefined, true, undefined];
const onFilters = [
  undefined,
  undefined,
  (value: string, record: DataTableRow): boolean =>
    record.witness.includes(value),
  undefined,
];
const sorters = [
  (a: { blockID: number }, b: { blockID: number }) => a.blockID - b.blockID,
  (a: { time: string }, b: { time: string }) =>
    new Date(a.time).getTime() - new Date(b.time).getTime(),
  undefined,
  (a: { transaction: number }, b: { transaction: number }) =>
    a.transaction - b.transaction,
];

export const BlockColumns: BlockColumnType[] = headings.map(
  (heading, index) => {
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
  }
);
