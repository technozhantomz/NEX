import Link from "next/link";

import * as Styled from "./CommitteeColumns.styled";

export const CommitteeColumns = [
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
    title: "Url",
    dataIndex: "url",
    key: "url",
    render: (url: string): JSX.Element => (
      <Link href={`${url}`} passHref>
        <Styled.urlIcon rotate={45} />
      </Link>
    ),
  },
];
