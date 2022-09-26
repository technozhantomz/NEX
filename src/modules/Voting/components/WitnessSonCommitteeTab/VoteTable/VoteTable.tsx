import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { capitalize } from "lodash";
import { CSSProperties, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import {
  useUserContext,
  useViewportContext,
} from "../../../../../common/providers";
import { DownloadOutlined, SearchOutlined } from "../../../../../ui/src";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTable.styled";
import { showVotesColumns } from "./components";
import { useVoteTable } from "./hooks";

type Props = {
  tab: string;
  votes: VoteRow[];
  type: "pendingChanges" | "allVotes";
  loading: boolean;
  approveVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
};

export const VoteTable = ({
  tab,
  votes,
  type,
  loading,
  approveVote,
  removeVote,
}: Props): JSX.Element => {
  const { searchDataSource, setSearchDataSource } = useVoteTable({ votes });
  const { sm } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const columns = showVotesColumns(approveVote, removeVote);
  const componentRef = useRef();

  return (
    <Styled.VoteTableWrapper>
      <Styled.VoteHeaderBar>
        <Styled.Title>
          {type === "pendingChanges"
            ? counterpart.translate(`field.labels.pending_changes`, {
                localStorageAccount,
              })
            : capitalize(counterpart.translate(`pages.voting.${tab}.heading`))}
        </Styled.Title>
        {type === "allVotes" ? (
          <>
            <SearchTableInput
              columns={columns}
              dataSource={votes}
              setDataSource={setSearchDataSource}
              inputProps={{
                placeholder: counterpart.translate(
                  `pages.blocks.${tab}.search_${tab}`
                ),
                suffix: <SearchOutlined />,
              }}
            />
            <Styled.DownloadLinks>
              <DownloadOutlined />
              <ReactToPrint
                trigger={() => (
                  <a href="#">{counterpart.translate(`links.pdf`)}</a>
                )}
                content={() => componentRef.current}
              />
              {` / `}
              <CSVLink
                filename={"WitnessesTable.csv"}
                data={votes}
                className="btn btn-primary"
              >
                {counterpart.translate(`links.csv`)}
              </CSVLink>
            </Styled.DownloadLinks>
          </>
        ) : (
          ""
        )}
      </Styled.VoteHeaderBar>
      <Styled.Container>
        {sm ? (
          <Styled.VoteList
            itemLayout="vertical"
            dataSource={searchDataSource}
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
                    <span className="vote-info-title">{columns[0].title}</span>
                    <span className="vote-info-value">
                      {(item as VoteRow).name}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">{columns[1].title}</span>
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
                    <span className="vote-info-title">{columns[2].title}</span>
                    <span className="vote-info-value">
                      {(item as VoteRow).votes}
                    </span>
                  </div>
                  <div className="vote-info">
                    <span className="vote-info-title">{columns[3].title}</span>
                    <span className="vote-info-value">
                      {type === "pendingChanges" ? (
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
            columns={columns}
            dataSource={searchDataSource}
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
      {type === "allVotes" ? (
        <Styled.PrintTable>
          <div ref={componentRef}>
            <Styled.VoteTable
              dataSource={votes}
              columns={columns}
              loading={loading}
              pagination={false}
            />
          </div>
        </Styled.PrintTable>
      ) : (
        ""
      )}
    </Styled.VoteTableWrapper>
  );
};
