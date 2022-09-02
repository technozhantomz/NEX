import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";

import * as Styled from "./WitnessesColumns.styled";

const headings = [
  "rank",
  "name",
  "total_votes",
  "last_block",
  "missed_blocks",
  "url",
];
const keys = ["rank", "name", "totalVotes", "lastBlock", "missedBlocks", "url"];
const renders = [
  undefined,
  (name: string): JSX.Element => <Link href={`/user/${name}`}>{name}</Link>,
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
        <Link href={`${url}`} passHref>
          <Styled.urlIcon rotate={45} />
        </Link>
      )}
    </>
  ),
];

export const WitnessesColumns = headings.map((heading, index) => {
  return {
    title: (): JSX.Element => <TableHeading heading={heading} />,
    dataIndex: keys[index],
    key: keys[index],
    render: renders[index],
  };
});
