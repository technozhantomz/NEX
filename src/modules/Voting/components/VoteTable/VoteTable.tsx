import React from "react";

import { useViewportContext } from "../../../../common/components/ViewportProvider/ViewportProvider";
import { List } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { VoteActionButton } from "../VoteActionButton";

import * as Styled from "./VoteTable.styled";
import { useVoteTable } from "./hooks";

export const VoteTable = (props: {
  tab: string;
  approved: boolean;
  account: string;
  filterVote?: string;
}): JSX.Element => {
  const { tableVotes, tableNotVotes, loading } = useVoteTable();
  const { width } = useViewportContext();
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
      render: (_value: any, _record: any) => {
        if (props.approved) {
          return <VoteActionButton txt="REMOVE" href={`#`} />;
        } else {
          return <VoteActionButton txt="ADD" href={`#`} />;
        }
      },
    },
  ];

  return (
    <>
      <Styled.Title>
        {props.approved
          ? `Approved by ${props.account} `
          : `Not approved by ${props.account} `}
        {props.approved ? <Styled.Check /> : <Styled.Xmark />}
      </Styled.Title>
      <Styled.Container>
        {width > breakpoints.sm ? (
          <Styled.VoteTable
            columns={columns}
            dataSource={
              props.approved
                ? tableVotes
                    .filter((item) => item.type === props.tab)
                    .sort((a, b) => b.votes - a.votes)
                : props.filterVote === ""
                ? tableNotVotes
                    .filter((item) => item.type === props.tab)
                    .sort((a, b) => b.votes - a.votes)
                : tableNotVotes
                    .filter((item) => item.type === props.tab)
                    .filter((item) => item.name === props.filterVote)
                    .sort((a, b) => b.votes - a.votes)
            }
            loading={loading}
            pagination={false}
            size="small"
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={
              props.approved
                ? tableVotes
                    .filter((item) => item.type === props.tab)
                    .sort((a, b) => b.votes - a.votes)
                : props.filterVote === ""
                ? tableNotVotes
                    .filter((item) => item.type === props.tab)
                    .sort((a, b) => b.votes - a.votes)
                : tableNotVotes
                    .filter((item) => item.type === props.tab)
                    .filter((item) => item.name === props.filterVote)
                    .sort((a, b) => b.votes - a.votes)
            }
            loading={loading}
            renderItem={(item) => (
              <Styled.VoteListItem
                key={item.key}
                actions={
                  props.approved
                    ? [<VoteActionButton txt="REMOVE" href={`#`} />]
                    : [<VoteActionButton txt="ADD" href={`#`} />]
                }
              >
                <Styled.VoteItemContent>
                  <div className="asset-info">
                    <span className="asset-info-title">{columns[0].title}</span>
                    <span className="asset-info-value">{item.name}</span>
                  </div>
                  <div className="asset-info">
                    <span className="asset-info-title">{columns[1].title}</span>
                    <span className="asset-info-value">{item.webpage}</span>
                  </div>
                  <div className="asset-info">
                    <span className="asset-info-title">{columns[2].title}</span>
                    <span className="asset-info-value">{item.votes}</span>
                  </div>
                </Styled.VoteItemContent>
              </Styled.VoteListItem>
            )}
          />
        )}
      </Styled.Container>
    </>
  );
};
