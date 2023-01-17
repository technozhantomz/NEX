import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../common/components";
import { Tooltip } from "../../../../../ui/src";
import { Key } from "../../../../../ui/src/icons";
import * as Styled from "../WitnessesTab.styled";
import { WitnessTableRow } from "../hooks";

const headings = [
  "rank",
  "name",
  "active",
  "total_votes",
  "last_block",
  "missed_blocks",
  "url",
  "key",
];
const keys = [
  "rank",
  "name",
  "active",
  "totalVotes",
  "lastBlock",
  "missedBlocks",
  "url",
  "publicKey",
];
const renders = [
  undefined,
  (name: string): JSX.Element => (
    <Link href={`/user/${name}`} target="_blank">
      {name}
    </Link>
  ),
  (active: boolean): JSX.Element => (
    <span>{active === true ? <Styled.ActiveIcon /> : ``}</span>
  ),
  undefined,
  (lastBlock: string): JSX.Element => (
    <Styled.LastBlock>{lastBlock}</Styled.LastBlock>
  ),
  (missedBlocks: string): JSX.Element => (
    <Styled.MissedBlocks>{missedBlocks}</Styled.MissedBlocks>
  ),
  (url: string): JSX.Element => (
    <>
      {!url || url === "" ? (
        <span>{counterpart.translate(`field.labels.not_available`)}</span>
      ) : (
        <a href={`${url}`} target="_blank">
          <Styled.urlIcon rotate={45} />
        </a>
      )}
    </>
  ),
  (publicKey: string): JSX.Element => (
    <Tooltip placement="top" title={publicKey}>
      <span>
        <Key />
      </span>
    </Tooltip>
  ),
];
const filters = [
  undefined,
  undefined,
  [
    {
      text: "Active",
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
  (a: { totalVotes: string }, b: { totalVotes: string }) =>
    parseFloat(a.totalVotes) - parseFloat(b.totalVotes),
  (a: { lastBlock: string }, b: { lastBlock: string }) =>
    parseFloat(a.lastBlock) - parseFloat(b.lastBlock),
  (a: { missedBlocks: string }, b: { missedBlocks: string }) =>
    parseFloat(a.missedBlocks) - parseFloat(b.missedBlocks),
  undefined,
  undefined,
];

export type WitnessColumnType = {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render:
    | ((name: string) => JSX.Element)
    | ((active: boolean) => JSX.Element)
    | undefined;
  filters:
    | {
        text: string;
        value: boolean;
      }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter: ((value: boolean, record: WitnessTableRow) => boolean) | undefined;
  sorter:
    | ((
        a: {
          rank: number;
        },
        b: {
          rank: number;
        }
      ) => number)
    | ((
        a: {
          lastBlock: string;
        },
        b: {
          lastBlock: string;
        }
      ) => number)
    | ((
        a: {
          missedBlocks: string;
        },
        b: {
          missedBlocks: string;
        }
      ) => number)
    | ((
        a: {
          totalVotes: string;
        },
        b: {
          totalVotes: string;
        }
      ) => number)
    | undefined;
};

export const WitnessesColumns: WitnessColumnType[] = headings.map(
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
