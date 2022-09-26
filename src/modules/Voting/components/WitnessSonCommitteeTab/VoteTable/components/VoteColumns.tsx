import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../../common/components";
import { VoteRow } from "../../../../types";
import * as Styled from "../VoteTable.styled";

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
          _value === "unapproved" ? (
            <Styled.ApprovedStatus>voting to approve</Styled.ApprovedStatus>
          ) : (
            <Styled.NotApprovedStatus>
              voting to remove approval
            </Styled.NotApprovedStatus>
          )
        ) : _value === "unapproved" ? (
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
        {_value === "add" || _value === "remove" || _value === "cancel" ? (
          <Styled.VoteActionButton
            onClick={() => {
              if (_value === "cancel") {
                removeVote(_record.id as string);
              } else {
                approveVote(_record.id as string);
              }
            }}
          >
            {_value.toUpperCase()}
          </Styled.VoteActionButton>
        ) : (
          <span>{_value.toUpperCase()}</span>
        )}
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
    [
      { text: "Approved", value: "approved" },
      { text: "Not Approved", value: "unapproved" },
    ],
    [
      { text: "Add", value: "add" },
      { text: "Remove", value: "remove" },
      { text: "Pending Add", value: "pending add" },
      { text: "Pending Remove", value: "pending remove" },
    ],
  ];
  const filterModes = [
    undefined,
    undefined,
    "menu",
    undefined,
    undefined,
    "menu",
    "menu",
  ];
  const filterSearch = [
    undefined,
    undefined,
    false,
    undefined,
    undefined,
    false,
    false,
  ];
  const onFilters = [
    undefined,
    undefined,
    (value: boolean, record: VoteRow): boolean => record.active === value,
    undefined,
    undefined,
    (value: string, record: VoteRow): boolean => record.status === value,
    (value: string, record: VoteRow): boolean => record.action === value,
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
