import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../common/components";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTable.styled";

export const showVotesColumns = (
  approveVote: (voteId: string) => void,

  removeVote: (voteId: string) => void
): ColumnsType<unknown> => {
  const headings = [
    "rank",
    "name",
    "active",
    "url",
    "votes",
    "status",
    "action",
  ];
  const keys = ["rank", "name", "active", "url", "votes", "status", "action"];

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
    (_value: string, _record: any): JSX.Element => (
      <>
        {_record.action === "cancel" ? (
          _value === "add" ? (
            <Styled.ApprovedStatus>voting to approve</Styled.ApprovedStatus>
          ) : (
            <Styled.NotApprovedStatus>
              voting to remove approval
            </Styled.NotApprovedStatus>
          )
        ) : _value === "add" ? (
          <>
            <Styled.Xmark></Styled.Xmark>
            <Styled.NotApprovedStatus>Not Approved</Styled.NotApprovedStatus>
          </>
        ) : (
          <>
            <Styled.Check></Styled.Check>
            <Styled.ApprovedStatus>Approved</Styled.ApprovedStatus>
          </>
        )}
      </>
    ),
    (_value: string, _record: any): JSX.Element => (
      <>
        <Styled.VoteActionButton
          onClick={() => {
            if (_value === "add" || _value === "remove") {
              approveVote(_record.id as string);
            } else {
              removeVote(_record.id as string);
            }
          }}
        >
          {_value.toUpperCase()}
        </Styled.VoteActionButton>
      </>
    ),
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
    undefined,
    undefined,
  ];
  const filterModes = [
    undefined,
    undefined,
    "menu",
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const filterSearch = [
    undefined,
    undefined,
    false,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const onFilters = [
    undefined,
    undefined,
    (value: boolean, record: VoteRow): boolean => record.active === value,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const sorters = [
    (a: { rank: number }, b: { rank: number }) => a.rank - b.rank,
    undefined,
    undefined,
    undefined,
    (a: { votes: string }, b: { votes: string }) =>
      parseFloat(a.votes) - parseFloat(b.votes),
    undefined,
    undefined,
  ];

  return headings.map((heading, index) => {
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
  }) as ColumnsType<unknown>;
};
