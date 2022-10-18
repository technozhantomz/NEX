import { TableHeading } from "../../../../../../common/components";

import * as Styled from "./TransactionsTable.styled";

const headings = [
  "rank",
  "id",
  "expiration",
  "operations",
  "ref_block_prefix",
  "ref_block_num",
  "extensions",
];
const keys = [
  "rank",
  "id",
  "expiration",
  "operations",
  "refBlockPrefix",
  "refBlockNum",
  "extensions",
];
const renders = [
  undefined,
  (id: string): JSX.Element => (
    <a target="_blank" href={`/transaction/${id}`}>
      <Styled.CenterEllipsis>
        <span className="ellipsis">{id}</span>
        <span className="indent">{id}</span>
      </Styled.CenterEllipsis>
    </a>
  ),
  (expiration: string): JSX.Element => (
    <Styled.TimeStamp>{expiration}</Styled.TimeStamp>
  ),
  undefined,
  undefined,
  undefined,
  undefined,
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
  (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
  undefined,
  (a: { expiration: string }, b: { expiration: string }) =>
    new Date(a.expiration).getTime() - new Date(b.expiration).getTime(),
  (a: { operations: number }, b: { operations: number }) =>
    a.operations - b.operations,
  (a: { refBlockPrefix: number }, b: { refBlockPrefix: number }) =>
    a.refBlockPrefix - b.refBlockPrefix,
  (a: { refBlockNum: number }, b: { refBlockNum: number }) =>
    a.refBlockNum - b.refBlockNum,
  (a: { extensions: number }, b: { extensions: number }) =>
    a.extensions - b.extensions,
];

export const TransactionsColumns = headings.map((heading, index) => {
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
