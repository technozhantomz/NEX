import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../../common/components";
import { VoteRow } from "../../../../types";
import * as Styled from "../VoteTable.styled";

export const showVotesColumns = (
  addChange: (voteId: string) => void,
  cancelChange: (voteId: string) => void,
  getActionString: (action: string) => string
): {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render:
    | ((active: boolean) => JSX.Element)
    | ((_value: string, _record: any) => JSX.Element)
    | undefined;
  filters:
    | { text: string; value: boolean }[]
    | { text: string; value: string }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter:
    | ((value: boolean, record: VoteRow) => boolean)
    | ((value: string, record: VoteRow) => boolean)
    | undefined;
  sorter:
    | ((a: { rank: number }, b: { rank: number }) => number)
    | ((a: { votes: string }, b: { votes: string }) => number)
    | undefined;
}[] => {
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
            <Styled.ApprovedStatus>
              {counterpart.translate(`pages.voting.status.pending_add`)}
            </Styled.ApprovedStatus>
          ) : (
            <Styled.NotApprovedStatus>
              {counterpart.translate(`pages.voting.status.pending_remove`)}
            </Styled.NotApprovedStatus>
          )
        ) : _value === "unapproved" ? (
          <>
            <Styled.Xmark></Styled.Xmark>
            <Styled.NotApprovedStatus>
              {counterpart.translate(`pages.voting.status.not_approved`)}
            </Styled.NotApprovedStatus>
          </>
        ) : (
          <>
            <Styled.Check></Styled.Check>
            <Styled.ApprovedStatus>
              {counterpart.translate(`pages.voting.status.approved`)}
            </Styled.ApprovedStatus>
          </>
        )}
      </>
    ),
    (value: string, record: any): JSX.Element => (
      <>
        {value === "add" || value === "remove" || value === "cancel" ? (
          <Styled.VoteActionButton
            onClick={() => {
              if (value === "cancel") {
                cancelChange(record.id as string);
              } else {
                addChange(record.id as string);
              }
            }}
          >
            {getActionString(value).toUpperCase()}
          </Styled.VoteActionButton>
        ) : (
          <span>
            {value === "pending add"
              ? counterpart
                  .translate(`pages.voting.actions.pending_add`)
                  .toUpperCase()
              : counterpart
                  .translate(`pages.voting.actions.pending_remove`)
                  .toUpperCase()}
          </span>
        )}
      </>
    ),
  ];

  const filters = [
    undefined,
    undefined,
    [
      {
        text: counterpart.translate(`tableFilters.avtive`),
        value: true,
      },
      {
        text: counterpart.translate(`tableFilters.inactive`),
        value: false,
      },
    ],
    undefined,
    undefined,
    [
      {
        text: counterpart.translate(`tableFilters.approved`),
        value: "approved",
      },
      {
        text: counterpart.translate(`tableFilters.not_approved`),
        value: "unapproved",
      },
    ],
    [
      { text: counterpart.translate(`tableFilters.add`), value: "add" },
      { text: counterpart.translate(`tableFilters.remove`), value: "remove" },
      {
        text: counterpart.translate(`tableFilters.pending_add`),
        value: "pending add",
      },
      {
        text: counterpart.translate(`tableFilters.pending_remove`),
        value: "pending remove",
      },
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
  });
};
