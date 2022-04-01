import React, { useEffect, useState } from "react";

import { useViewportContext } from "../../../../common/components/ViewportProvider/ViewportProvider";
import { List } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";

import * as Styled from "./VoteTable.styled";
import { IVoteRow } from "./hooks/useVoteTable.types";

type Props = {
  table: IVoteRow[];
  tab: string;
  tableType: string;
  account: string;
  filterVote?: string;
  loading: boolean;
  doAction: (txt: string, tableRow?: IVoteRow) => Promise<void>;
};

export const VoteTable = ({
  table,
  tab,
  tableType,
  account,
  filterVote = "",
  loading,
  doAction,
}: Props): JSX.Element => {
  const [dataSource, setDataSource] = useState<IVoteRow[]>([]);
  const { width } = useViewportContext();
  useEffect(() => {
    const t = table.map((x) => {
      return x;
    });
    const d =
      filterVote === ""
        ? t
            .filter((item) => {
              return item.type === tab;
            })
            .sort((a, b) => {
              return b.votes - a.votes;
            })
            .sort((a, b) => {
              return a.action.charCodeAt(0) - b.action.charCodeAt(0);
            })
        : t
            .filter((item) => {
              return item.type === tab;
            })
            .filter((item) => {
              return item.name.startsWith(filterVote);
            })
            .sort((a, b) => {
              return b.votes - a.votes;
            })
            .sort((a, b) => {
              return a.action.charCodeAt(0) - b.action.charCodeAt(0);
            });
    setDataSource(d);
  }, [table]);
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
      render: (_value: number, _record: any) => {
        const totalVotesDisplay = _value / 100000; // Precision is 5.
        return (
          <>
            {totalVotesDisplay.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} {"PPY"}
          </>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_value: any, _record: any) => {
        if (tableType === "approved") {
          return (
            <Styled.VoteActionButton
              onClick={() => doAction("REMOVE", _record)}
            >
              {"REMOVE VOTE"}
            </Styled.VoteActionButton>
          );
        } else if (tableType === "notapproved") {
          return (
            <Styled.VoteActionButton onClick={() => doAction("ADD", _record)}>
              {"ADD VOTE"}
            </Styled.VoteActionButton>
          );
        } else {
          return (
            <Styled.VoteActionButton onClick={() => doAction("UNDO", _record)}>
              {"UNDO"}
            </Styled.VoteActionButton>
          );
        }
      },
    },
  ];

  const columnsWithPending = columns.concat([
    {
      title: "Pending Change",
      dataIndex: "action",
      key: "action",
    },
  ]);

  return (
    <>
      <Styled.Title>
        {tableType === "approved"
          ? `Approved by ${account} `
          : tableType === "notapproved"
          ? `Not approved by ${account} `
          : `Unpublished changes by ${account} `}
        {tableType === "approved" ? (
          <Styled.Check />
        ) : tableType === "notapproved" ? (
          <Styled.Xmark />
        ) : (
          <Styled.Exmark />
        )}
      </Styled.Title>
      <Styled.Container>
        {width > breakpoints.sm ? (
          <Styled.VoteTable
            columns={tableType === "changes" ? columnsWithPending : columns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
            size="small"
          />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={dataSource}
            loading={loading}
            renderItem={(item) => (
              <Styled.VoteListItem
                key={item.key}
                actions={
                  tableType == "approved"
                    ? [
                        <Styled.VoteActionButton
                          onClick={() => doAction("REMOVE", item)}
                        >
                          {"REMOVE VOTE"}
                        </Styled.VoteActionButton>,
                      ]
                    : tableType == "notapproved"
                    ? [
                        <Styled.VoteActionButton
                          onClick={() => doAction("ADD", item)}
                        >
                          {"ADD VOTE"}
                        </Styled.VoteActionButton>,
                      ]
                    : [
                        <Styled.VoteActionButton
                          onClick={() => doAction("UNDO", item)}
                        >
                          {"UNDO"}
                        </Styled.VoteActionButton>,
                      ]
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
                  {tableType === "changes" ? (
                    <div className="asset-info">
                      <span className="asset-info-title">
                        {columnsWithPending[4].title}
                      </span>
                      <span className="asset-info-value">{item.action}</span>
                    </div>
                  ) : (
                    ""
                  )}
                </Styled.VoteItemContent>
              </Styled.VoteListItem>
            )}
          />
        )}
      </Styled.Container>
    </>
  );
};
