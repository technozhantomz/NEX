import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";

import * as Styled from "./CommitteeColumns.styled";

export const CommitteeColumns = [
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
    title: (): JSX.Element => <TableHeading heading={"url"} />,
    dataIndex: "url",
    key: "url",
    render: (url: string): JSX.Element => (
      <>
        {url == "" ? (
          <span>{counterpart.translate(`field.labels.not_available`)}</span>
        ) : (
          <Link href={`${url}`} passHref>
            <Styled.urlIcon rotate={45} />
          </Link>
        )}
      </>
    ),
  },
];
