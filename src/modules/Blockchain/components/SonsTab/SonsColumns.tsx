import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";

import * as Styled from "./SonsColumns.styled";
import { SonsTableRow } from "./hooks/useSonsTab.types";

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

export const SonsColumns = headings.map((heading, index) => {
  if (heading === "active") {
    return {
      title: (): JSX.Element => <TableHeading heading={heading} />,
      dataIndex: keys[index],
      key: keys[index],
      render: renders[index],
      filters: [
        {
          text: "Avtive",
          value: true,
        },
        {
          text: "Inactive",
          value: false,
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value: boolean, record: SonsTableRow): boolean =>
        record.active === value,
    };
  }
  return {
    title: (): JSX.Element => <TableHeading heading={heading} />,
    dataIndex: keys[index],
    key: keys[index],
    render: renders[index],
  };
});
