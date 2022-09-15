import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";
import { Key } from "../../../../ui/src/icons";

import * as Styled from "./WitnessesTab.styled";
import { WitnessTableRow } from "./hooks/useWitnessesTab.types";

const headings = [
  "rank",
  "name",
  "active",
  "url",
  "last_block",
  "missed_blocks",
  "total_votes",
  "key",
];
const keys = [
  "rank",
  "name",
  "active",
  "url",
  "lastBlock",
  "missedBlocks",
  "totalVotes",
  "publicKey",
];
const renders = [
  undefined,
  (name: string): JSX.Element => <Link href={`/user/${name}`}>{name}</Link>,
  (active: boolean): JSX.Element => (
    <span>{active === true ? <Styled.ActiveIcon /> : ``}</span>
  ),
  (url: string): JSX.Element => (
    <>
      {!url || url === "" ? (
        <span>{counterpart.translate(`field.labels.not_available`)}</span>
      ) : (
        <Link href={`${url}`} passHref>
          <Styled.urlIcon rotate={45} />
        </Link>
      )}
    </>
  ),
  (lastBlock: string): JSX.Element => (
    <Styled.LastBlock>{lastBlock}</Styled.LastBlock>
  ),
  (missedBlocks: string): JSX.Element => (
    <Styled.MissedBlocks>{missedBlocks}</Styled.MissedBlocks>
  ),
  undefined,
  (publicKey: string): JSX.Element => (
    <Link href={`${publicKey}`} passHref>
      <Key />
    </Link>
  ),
];
const filters = [
  undefined,
  undefined,
  [
    {
      text: "Avtive",
      value: true,
    },
    {
      text: "Inactive",
      value: false,
    },
  ],
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterModes = [
  undefined,
  undefined,
  "menu",
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const filterSearch = [
  undefined,
  undefined,
  false,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const onFilters = [
  undefined,
  undefined,
  (value: boolean, record: WitnessTableRow): boolean => record.active === value,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];
const sorters = [
  (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
  undefined,
  undefined,
  undefined,
  (a: { lastBlock: string }, b: { lastBlock: string }) =>
    parseFloat(a.lastBlock) - parseFloat(b.lastBlock),
  (a: { missedBlocks: string }, b: { missedBlocks: string }) =>
    parseFloat(a.missedBlocks) - parseFloat(b.missedBlocks),
  (a: { totalVotes: string }, b: { totalVotes: string }) =>
    parseFloat(a.totalVotes) - parseFloat(b.totalVotes),
  undefined,
];

export const WitnessesColumns = headings.map((heading, index) => {
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
