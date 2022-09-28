import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../../../../common/components";
import * as Styled from "../ProxyTable.styled";
import { ProxyRow } from "../hooks/useProxyTable.types";

export const ProxyColumns = (
  addChange: (voteId: string) => void,
  cancelChange: (voteId: string) => void,
  getActionString: (action: string) => string,
  tableType: string
): ColumnsType<ProxyRow> => {
  const headings = [
    "name",
    "witness_votes",
    "sons_votes",
    "committee_votes",
    "last_voted",
    tableType === "allVotes" ? "status" : "pending_changes",
    "action",
  ];
  const keys = [
    "name",
    "witnessVotes",
    "sonsVotes",
    "committeeVotes",
    "lastVoted",
    "status",
    "action",
  ];
  const renders = [
    (name: string): JSX.Element => <Link href={`/user/${name}`}>{name}</Link>,
    undefined,
    undefined,
    undefined,
    undefined,
    (value: string, record: ProxyRow): JSX.Element => (
      <>
        {record.action === "cancel" ? (
          value === "unapproved" ? (
            <Styled.ApprovedStatus>
              {counterpart.translate(`pages.voting.status.pending_add`)}
            </Styled.ApprovedStatus>
          ) : (
            <Styled.NotApprovedStatus>
              {counterpart.translate(`pages.voting.status.pending_remove`)}
            </Styled.NotApprovedStatus>
          )
        ) : value === "unapproved" ? (
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
    (value: string, record: ProxyRow): JSX.Element => (
      <>
        {value === "add" || value === "remove" || value === "cancel" ? (
          <Styled.ProxyTableActionButton
            onClick={() => {
              if (value === "cancel") {
                cancelChange(record.id as string);
              } else {
                addChange(record.id as string);
              }
            }}
          >
            {getActionString(value).toUpperCase()}
          </Styled.ProxyTableActionButton>
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
    undefined,
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
    undefined,
    undefined,
    undefined,
    "menu",
    "menu",
  ];
  const filterSearch = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    false,
    false,
  ];
  const onFilters = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    (value: string, record: ProxyRow): boolean => record.status === value,
    (value: string, record: ProxyRow): boolean => record.action === value,
  ];
  const sorters = [
    undefined,
    (a: { witness: number }, b: { witness: number }) => a.witness - b.witness,
    (a: { sons: number }, b: { sons: number }) => a.sons - b.sons,
    (a: { committee: number }, b: { committee: number }) =>
      a.committee - b.committee,
    undefined,
    undefined,
    undefined,
  ]; //TODO: sort by date

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
  }) as ColumnsType<ProxyRow>;
};
