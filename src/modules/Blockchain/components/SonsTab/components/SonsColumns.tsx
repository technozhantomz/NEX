import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../common/components";
import * as Styled from "../SonsTab.styled";
import { SonsTableRow } from "../hooks";

const headings = ["rank", "name", "active", "url", "total_votes"];
const keys = ["rank", "name", "active", "url", "totalVotes"];
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

export type SonColumnType = {
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
  onFilter: ((value: boolean, record: SonsTableRow) => boolean) | undefined;
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
          totalVotes: string;
        },
        b: {
          totalVotes: string;
        }
      ) => number)
    | undefined;
};

export const SonsColumns: SonColumnType[] = headings.map((heading, index) => {
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
