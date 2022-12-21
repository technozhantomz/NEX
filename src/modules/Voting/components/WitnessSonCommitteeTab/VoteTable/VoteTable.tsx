import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { capitalize } from "lodash";
import Link from "next/link";
import { useRef } from "react";

import {
  renderPaginationItem,
  TableDownloader,
} from "../../../../../common/components";
import { useViewportContext } from "../../../../../common/providers";
import { SearchOutlined } from "../../../../../ui/src";
import { VoteRow } from "../../../types";

import * as Styled from "./VoteTable.styled";
import { showVotesColumns } from "./components";
import { useVoteTable } from "./hooks";

type Props = {
  tab: string;
  votesRows: VoteRow[];
  loading: boolean;
  addVote: (voteId: string) => void;
  removeVote: (voteId: string) => void;
  localApprovedVotesIds: string[];
};

export const VoteTable = ({
  tab,
  votesRows,
  loading,
  addVote,
  removeVote,
  localApprovedVotesIds,
}: Props): JSX.Element => {
  const { searchDataSource, setSearchDataSource } = useVoteTable({ votesRows });
  const isWitnessTab = tab === "witnesses";

  const { sm } = useViewportContext();
  const columns = showVotesColumns(
    localApprovedVotesIds,
    addVote,
    removeVote,
    isWitnessTab
  );
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.VoteTableWrapper>
      <Styled.VoteHeaderBar>
        <Styled.Title>
          {capitalize(counterpart.translate(`pages.voting.${tab}.heading`))}{" "}
        </Styled.Title>
        <SearchTableInput
          columns={columns as ColumnsType<unknown>}
          dataSource={votesRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.${tab}.search_${tab}`
            ),
            suffix: <SearchOutlined />,
          }}
        />
        <TableDownloader
          componentRef={componentRef}
          data={votesRows}
        ></TableDownloader>
      </Styled.VoteHeaderBar>
      <Styled.Container>
        {sm ? (
          <Styled.VoteList
            itemLayout="vertical"
            dataSource={searchDataSource}
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              defaultCurrent: 1,
              showSizeChanger: true,
              showLessItems: true,
              size: "small",
              itemRender: renderPaginationItem(),
            }}
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
                      <Link
                        href={`${(item as VoteRow).url}`}
                        passHref
                        target="_blank"
                      >
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
                  {!isWitnessTab ? (
                    <>
                      {" "}
                      <div className="item-info">
                        <span className="item-info-title">
                          {columns[5].title()}
                        </span>
                        <span className="item-info-value">
                          {(item as VoteRow).status === "unapproved" ? (
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
                          {!localApprovedVotesIds.includes(
                            (item as VoteRow).id
                          ) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                addVote((item as VoteRow).id);
                              }}
                            >
                              <Styled.LikeOutlinedIcon />
                            </div>
                          ) : (
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                removeVote((item as VoteRow).id);
                              }}
                            >
                              <Styled.LikeFilledIcon />
                            </div>
                          )}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="item-info">
                        <span className="item-info-title">
                          {columns[5].title()}
                        </span>
                        <span className="item-info-value">
                          <Styled.MissedBlocks>
                            {(item as VoteRow).missedBlocks}
                          </Styled.MissedBlocks>
                        </span>
                      </div>
                      <div className="item-info">
                        <span className="item-info-title">
                          {columns[6].title()}
                        </span>
                        <span className="item-info-value">
                          {(item as VoteRow).status === "unapproved" ? (
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
                          {columns[7].title()}
                        </span>
                        <span className="item-info-value">
                          {!localApprovedVotesIds.includes(
                            (item as VoteRow).id
                          ) ? (
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                addVote((item as VoteRow).id);
                              }}
                            >
                              <Styled.LikeOutlinedIcon />
                            </div>
                          ) : (
                            <div
                              className="cursor-pointer"
                              onClick={() => {
                                removeVote((item as VoteRow).id);
                              }}
                            >
                              <Styled.LikeFilledIcon />
                            </div>
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </Styled.VoteItemContent>
              </Styled.VoteListItem>
            )}
          />
        ) : (
          <Styled.VoteTable
            columns={columns as ColumnsType<unknown>}
            dataSource={searchDataSource}
            loading={loading}
            pagination={{
              defaultPageSize: 20,
              defaultCurrent: 1,
              showSizeChanger: true,
              size: "small",
              showLessItems: true,
              itemRender: renderPaginationItem(),
            }}
            size="small"
          />
        )}
      </Styled.Container>

      <Styled.PrintTable>
        <div ref={componentRef}>
          <Styled.VoteTable
            dataSource={votesRows}
            columns={columns as ColumnsType<unknown>}
            loading={loading}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </Styled.VoteTableWrapper>
  );
};
