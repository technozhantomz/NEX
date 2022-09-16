import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../common/components";
import * as Styled from "../SonsTab.styled";
import { SonsTableRow } from "../hooks";

const headings = ["rank", "name", "active", "url", "total_votes"];
const keys = ["rank", "name", "active", "url", "totalVotes"];
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
  undefined,
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
];
const filterModes = [undefined, undefined, "menu", undefined, undefined];
const filterSearch = [undefined, undefined, false, undefined, undefined];
const onFilters = [
  undefined,
  undefined,
  (value: boolean, record: SonsTableRow): boolean => record.active === value,
  undefined,
  undefined,
];
const sorters = [
  (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
  undefined,
  undefined,
  undefined,
  (a: { totalVotes: string }, b: { totalVotes: string }) =>
    parseFloat(a.totalVotes) - parseFloat(b.totalVotes),
];

export const SonsColumns = headings.map((heading, index) => {
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
