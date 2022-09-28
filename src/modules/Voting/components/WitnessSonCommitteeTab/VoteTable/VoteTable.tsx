import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { capitalize } from "lodash";
import Link from "next/link";
import { CSSProperties, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { useViewportContext } from "../../../../../common/providers";
import { DownloadOutlined, List, SearchOutlined } from "../../../../../ui/src";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTable.styled";
import { showVotesColumns } from "./components";
import { useVoteTable } from "./hooks";

type Props = {
  tab: string;
  votes: VoteRow[];
  type: "pendingChanges" | "allVotes";
  loading: boolean;
  addChange: (voteId: string) => void;
  cancelChange: (voteId: string) => void;
};

export const VoteTable = ({
  tab,
  votes,
  type,
  loading,
  addChange,
  cancelChange,
}: Props): JSX.Element => {
  const { searchDataSource, setSearchDataSource, getActionString } =
    useVoteTable({ votes });
  const { sm } = useViewportContext();
  const columns = showVotesColumns(
    addChange,
    cancelChange,
    getActionString,
    type
  );
  const componentRef = useRef();

  return (
    <Styled.VoteTableWrapper>
      <Styled.VoteHeaderBar>
        <Styled.Title>
          {type === "pendingChanges"
            ? counterpart.translate(`field.labels.pending_changes`)
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
                filename={`${tab}VotesTable.csv`}
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
          <List
            itemLayout="vertical"
            dataSource={searchDataSource}
            loading={loading}
            renderItem={(item) => (
              <Styled.VoteListItem key={(item as VoteRow).key}>
                <Styled.VoteItemContent>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[0].title()}
                    </span>
                    <span className="item-info-value">
                      {(item as VoteRow).rank}
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[1].title()}
                    </span>
                    <span className="item-info-value">
                      <Link href={`/user/${(item as VoteRow).name}`}>
                        {(item as VoteRow).name}
                      </Link>
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[2].title()}
                    </span>
                    <span className="item-info-value">
                      <span>
                        {(item as VoteRow).active === true ? (
                          <Styled.ActiveIcon />
                        ) : (
                          ``
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[3].title()}
                    </span>
                    <span className="item-info-value">
                      <Link href={`${(item as VoteRow).url}`} passHref>
                        <Styled.urlIcon rotate={45} />
                      </Link>
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[4].title()}
                    </span>
                    <span className="item-info-value">
                      {(item as VoteRow).votes}
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[5].title()}
                    </span>
                    <span className="item-info-value">
                      {(item as VoteRow).action === "cancel" ? (
                        (item as VoteRow).status === "unapproved" ? (
                          <Styled.ApprovedStatus>
                            {counterpart.translate(
                              `pages.voting.status.pending_add`
                            )}
                          </Styled.ApprovedStatus>
                        ) : (
                          <Styled.NotApprovedStatus>
                            {counterpart.translate(
                              `pages.voting.status.pending_remove`
                            )}
                          </Styled.NotApprovedStatus>
                        )
                      ) : (item as VoteRow).status === "unapproved" ? (
                        <>
                          <Styled.Xmark></Styled.Xmark>
                          <Styled.NotApprovedStatus>
                            {counterpart.translate(
                              `pages.voting.status.not_approved`
                            )}
                          </Styled.NotApprovedStatus>
                        </>
                      ) : (
                        <>
                          <Styled.Check></Styled.Check>
                          <Styled.ApprovedStatus>
                            {counterpart.translate(
                              `pages.voting.status.approved`
                            )}
                          </Styled.ApprovedStatus>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="item-info">
                    <span className="item-info-title">
                      {columns[6].title()}
                    </span>
                    <span className="item-info-value">
                      {(item as VoteRow).action === "add" ||
                      (item as VoteRow).action === "remove" ||
                      (item as VoteRow).action === "cancel" ? (
                        <Styled.VoteActionButton
                          onClick={() => {
                            if ((item as VoteRow).action === "cancel") {
                              cancelChange((item as VoteRow).id as string);
                            } else {
                              addChange((item as VoteRow).id as string);
                            }
                          }}
                        >
                          {getActionString(
                            (item as VoteRow).action
                          ).toUpperCase()}
                        </Styled.VoteActionButton>
                      ) : (
                        <span>
                          {(item as VoteRow).action === "pending add"
                            ? counterpart
                                .translate(`pages.voting.actions.pending_add`)
                                .toUpperCase()
                            : counterpart
                                .translate(
                                  `pages.voting.actions.pending_remove`
                                )
                                .toUpperCase()}
                        </span>
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
