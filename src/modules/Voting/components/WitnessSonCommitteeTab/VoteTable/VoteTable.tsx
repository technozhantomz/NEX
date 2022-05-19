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
  const { xs } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const columns = showVotesColumns(approveVote, removeVote);
  return (
    <>
      <Styled.Title>
        {type === "approved"
          ? `Approved by ${localStorageAccount} `
          : `Not approved by ${localStorageAccount}`}
        {type === "approved" ? <Styled.Check /> : <Styled.Xmark />}
      </Styled.Title>
      <Styled.Container>
        {xs ? (
          <Styled.VoteList
            itemLayout="vertical"
            dataSource={votes}
            loading={loading}
            pagination={{ position: "bottom", size: "small", pageSize: 20 }}
            renderItem={(item) => (
              <Styled.VoteListItem key={(item as VoteRow).key}>
                <Styled.VoteItemContent>
                  <div className="vote-info">
                    <span className="vote-info-title">{columns[0].title}</span>
                    <span className="vote-info-value">
                      {(item as VoteRow).name}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">{columns[1].title}</span>
                    <span className="vote-info-value">
                      {(item as VoteRow).website}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">{columns[2].title}</span>
                    <span className="vote-info-value">
                      {(item as VoteRow).votes}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">{columns[3].title}</span>
                    <span className="vote-info-value">
                      {type === "approved" ? (
                        <Styled.VoteActionButton
                          onClick={() => removeVote((item as VoteRow).id)}
                        >
                          REMOVE
                        </Styled.VoteActionButton>
                      ) : (
                        <Styled.VoteActionButton
                          onClick={() => approveVote((item as VoteRow).id)}
                        >
                          ADD
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
            columns={columns}
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
                      Previous
                    </a>
                  );
                }
                if (type === "next") {
                  return (
                    <a style={{ marginLeft: "8px" } as CSSProperties}>Next</a>
                  );
                }
                return element;
              },
            }}
            size="small"
          />
        )}
      </Styled.Container>
    </>
  );
};
