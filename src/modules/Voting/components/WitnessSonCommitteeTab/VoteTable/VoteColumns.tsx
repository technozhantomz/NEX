import counterpart from "counterpart";

import * as Styled from "./VoteTable.styled";

export const showVotesColumns = (
  approveVote: (voteId: string) => void,
  removeVote: (voteId: string) => void
): (
  | {
      title: string;
      dataIndex: string;
      key: string;
      render?: undefined;
    }
  | {
      title: string;
      dataIndex: string;
      key: string;
      render: (_value: string, _record: any) => JSX.Element;
    }
)[] => {
  const columns = [
    {
      title: counterpart.translate(`tableHead.name`),
      dataIndex: "name",
      key: "name",
    },
    {
      title: counterpart.translate(`tableHead.website`),
      dataIndex: "website",
      key: "website",
      render: (_value: string, _record: any): JSX.Element => {
        if (_value === "") {
          return (
            <span>{counterpart.translate(`field.labels.not_available`)}</span>
          );
        } else {
          return (
            <a target="_blank" href={_value}>
              {_value}
            </a>
          );
        }
      },
    },
    {
      title: counterpart.translate(`tableHead.votes`),
      dataIndex: "votes",
      key: "votes",
    },
    {
      title: counterpart.translate(`tableHead.action`),
      dataIndex: "action",
      key: "action",
      render: (_value: string, _record: any): JSX.Element => {
        return (
          <Styled.VoteActionButton
            onClick={() => {
              if (_value === "add") {
                approveVote(_record.id as string);
              } else {
                removeVote(_record.id as string);
              }
            }}
          >
            {_value.toUpperCase()}
          </Styled.VoteActionButton>
        );
      },
    },
  ];
  return columns;
};
