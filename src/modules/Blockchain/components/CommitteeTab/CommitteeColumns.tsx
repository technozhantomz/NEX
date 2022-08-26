import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";

import * as Styled from "./CommitteeColumns.styled";

const headings = ["rank", "name", "total_votes", "url"];
const keys = ["rank", "name", "totalVotes", "url"];
const renders = [
  undefined,
  (name: string): JSX.Element => <Link href={`/user/${name}`}>{name}</Link>,
  undefined,
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
];

export const CommitteeColumns = headings.map((heading, index) => {
  return {
    title: (): JSX.Element => <TableHeading heading={heading} />,
    dataIndex: keys[index],
    key: keys[index],
    render: renders[index],
  };
});
