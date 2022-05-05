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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (_value: string, _record: any): JSX.Element => {
        if (_value === "") {
          return <span>Not available</span>;
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
      title: "Votes",
      dataIndex: "votes",
      key: "votes",
    },
    {
      title: "Action",
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
