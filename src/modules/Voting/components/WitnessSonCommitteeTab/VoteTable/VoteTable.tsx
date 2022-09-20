import counterpart from "counterpart";
import { CSSProperties, ReactNode } from "react";

import {
  useUserContext,
  useViewportContext,
} from "../../../../../common/providers";
import { VoteRow } from "../../../types";

import { showVotesColumns } from "./VoteColumns";
import * as Styled from "./VoteTable.styled";

type Props = {
  votes: VoteRow[];
  type: "approved" | "notApproved";
  loading: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
};

export const VoteTable = ({
  votes,
  type,
  loading,
  approveVote,
  removeVote,
}: Props): JSX.Element => {
  const { sm } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  // const columns = showVotesColumns(approveVote, removeVote);
  return (
    <Styled.VoteTableWrapper>
      <Styled.Title>
        {type === "approved"
          ? counterpart.translate(`field.labels.approved_by`, {
              localStorageAccount,
            })
          : counterpart.translate(`field.labels.not_approved_by`, {
              localStorageAccount,
            })}
        {type === "approved" ? <Styled.Check /> : <Styled.Xmark />}
      </Styled.Title>
      <Styled.Container>
        {sm ? (
          <Styled.VoteList
            itemLayout="vertical"
            dataSource={votes}
            loading={loading}
            pagination={
              !loading
                ? {
                    position: "bottom",
                    size: "small",
                    showSizeChanger: false,
                    pageSize: 2,
                    showLessItems: true,
                    itemRender: (
                      _page: number,
                      type:
                        | "page"
                        | "prev"
                        | "next"
                        | "jump-prev"
                        | "jump-next",
                      element: ReactNode
                    ) => {
                      if (type === "prev") {
                        return (
                          <>
                            {" "}
                            {_page > 0 ? (
                              <a
                                style={{ marginRight: "8px" } as CSSProperties}
                              >
                                {counterpart.translate(`buttons.previous`)}
                              </a>
                            ) : (
                              ""
                            )}
                          </>
                        );
                      }
                      if (type === "next") {
                        return (
                          <a style={{ marginLeft: "8px" } as CSSProperties}>
                            {counterpart.translate(`buttons.next`)}
                          </a>
                        );
                      }
                      return element;
                    },
                  }
                : false
            }
            renderItem={(item) => (
              <Styled.VoteListItem key={(item as VoteRow).key}>
                <Styled.VoteItemContent>
                  <div className="vote-info">
                    <span className="vote-info-title">
                      {showVotesColumns[0].title}
                    </span>
                    <span className="vote-info-value">
                      {(item as VoteRow).name}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">
                      {showVotesColumns[1].title}
                    </span>
                    <span className="vote-info-value">
                      {(item as VoteRow).url == "" ? (
                        <span>
                          {counterpart.translate(`field.labels.not_available`)}
                        </span>
                      ) : (
                        <a target="_blank" href={(item as VoteRow).url}>
                          {(item as VoteRow).url}
                        </a>
                      )}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">
                      {showVotesColumns[2].title}
                    </span>
                    <span className="vote-info-value">
                      {(item as VoteRow).votes}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">
                      {showVotesColumns[3].title}
                    </span>
                    <span className="vote-info-value">
                      {type === "approved" ? (
                        <Styled.VoteActionButton
                          onClick={() => removeVote((item as VoteRow).id)}
                        >
                          {counterpart.translate(`buttons.remove`)}
                        </Styled.VoteActionButton>
                      ) : (
                        <Styled.VoteActionButton
                          onClick={() => approveVote((item as VoteRow).id)}
                        >
                          {counterpart.translate(`buttons.add`)}
                        </Styled.VoteActionButton>
                      )}
                    </span>
                  </div>
                </Styled.VoteItemContent>
              </Styled.VoteListItem>
            )}
          />
        ) : (
          <Styled.VoteTable
            columns={showVotesColumns}
            dataSource={votes}
            loading={loading}
            pagination={{
              position: ["bottomRight"],
              size: "small",
              pageSize: 5,
              itemRender: (
                _page: number,
                type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                element: ReactNode
              ) => {
                if (type === "prev") {
                  return (
                    <a style={{ marginRight: "8px" } as CSSProperties}>
                      {counterpart.translate(`buttons.previous`)}
                    </a>
                  );
                }
                if (type === "next") {
                  return (
                    <a style={{ marginLeft: "8px" } as CSSProperties}>
                      {counterpart.translate(`buttons.next`)}
                    </a>
                  );
                }
                return element;
              },
            }}
            size="small"
          />
        )}
      </Styled.Container>
    </Styled.VoteTableWrapper>
  );
};
