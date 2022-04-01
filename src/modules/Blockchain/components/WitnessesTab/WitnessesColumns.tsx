import Link from "next/link";

import { LinkOutlined } from "../../../../ui/src";

import * as Styled from "./WitnessesColumns.styled";

export const WitnessesColumns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: string): JSX.Element => (
      <Link href={`/user/${name}`}>{name}</Link>
    ),
  },
  {
    title: "Total Votes",
    dataIndex: "totalVotes",
    key: "totalVotes",
  },
  {
    title: "Last Block",
    dataIndex: "lastBlock",
    key: "lastBlock",
    render: (lastBlock: string): JSX.Element => (
      <Styled.LastBlock>{lastBlock}</Styled.LastBlock>
    ),
  },
  {
    title: "Missed Blocks",
    dataIndex: "missedBlocks",
    key: "missedBlocks",
    render: (missedBlocks: string): JSX.Element => (
      <Styled.MissedBlocks>{missedBlocks}</Styled.MissedBlocks>
    ),
  },
  {
    title: "Url",
    dataIndex: "url",
    key: "url",
    render: (url: string): JSX.Element => (
      <Link href={`${url}`} passHref>
        <LinkOutlined rotate={45} />
      </Link>
    ),
  },
];
