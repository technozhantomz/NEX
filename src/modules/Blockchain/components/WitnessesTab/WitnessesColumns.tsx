import Link from "next/link";

import { TableHeading } from "../../../../common/components";

import * as Styled from "./WitnessesColumns.styled";

export const WitnessesColumns = [
  {
    title: (): JSX.Element => <TableHeading heading={"rank"} />,
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"name"} />,
    dataIndex: "name",
    key: "name",
    render: (name: string): JSX.Element => (
      <Link href={`/user/${name}`}>{name}</Link>
    ),
  },
  {
    title: (): JSX.Element => <TableHeading heading={"total_votes"} />,
    dataIndex: "totalVotes",
    key: "totalVotes",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"last_block"} />,
    dataIndex: "lastBlock",
    key: "lastBlock",
    render: (lastBlock: string): JSX.Element => (
      <Styled.LastBlock>{lastBlock}</Styled.LastBlock>
    ),
  },
  {
    title: (): JSX.Element => <TableHeading heading={"missed_blocks"} />,
    dataIndex: "missedBlocks",
    key: "missedBlocks",
    render: (missedBlocks: string): JSX.Element => (
      <Styled.MissedBlocks>{missedBlocks}</Styled.MissedBlocks>
    ),
  },
  {
    title: (): JSX.Element => <TableHeading heading={"url"} />,
    dataIndex: "url",
    key: "url",
    render: (url: string): JSX.Element => (
      <Link href={`${url}`} passHref>
        <Styled.urlIcon rotate={45} />
      </Link>
    ),
  },
];
