import Link from "next/link";

import { LinkOutlined } from "../../../../ui/src";

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
        <LinkOutlined rotate={45} />
      </Link>
    ),
  },
];
