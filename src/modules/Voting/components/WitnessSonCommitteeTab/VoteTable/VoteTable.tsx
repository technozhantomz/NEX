import { SearchTableInput } from "ant-table-extensions";
import { TablePaginationConfig } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { capitalize } from "lodash";
import Link from "next/link";
import { Dispatch, ReactInstance, SetStateAction, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { DEFAULT_PROXY_ID } from "../../../../../api/params";
import {
  PasswordModal,
  renderPaginationConfig,
  TransactionModal,
} from "../../../../../common/components";
import { useHandleTransactionForm } from "../../../../../common/hooks";
import {
  useUserContext,
  useViewportContext,
} from "../../../../../common/providers";
import { Proxy, SignerKey } from "../../../../../common/types";
import {
  DownloadOutlined,
  Form,
  SearchOutlined,
  Tooltip,
} from "../../../../../ui/src";
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
  name: string;
  handleReconfirmVoting: (signerKey: SignerKey) => Promise<void>;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  reconfirmFee: number;
  proxy: Proxy;
  desiredMembers: number;
};

export const VoteTable = ({
  tab,
  votes,
  type,
  loading,
  addChange,
  cancelChange,
  name,
  handleReconfirmVoting,
  loadingTransaction,
  setTransactionErrorMessage,
  setTransactionSuccessMessage,
  transactionErrorMessage,
  transactionSuccessMessage,
  reconfirmFee,
  proxy,
  desiredMembers,
}: Props): JSX.Element => {
  const {
    searchDataSource,
    setSearchDataSource,
    getActionString,
    reconfirmVoteForm,
  } = useVoteTable({ votes });
  const isWitnessTab = tab === "witnesses";

  const { sm } = useViewportContext();
  const { localStorageAccount } = useUserContext();
  const columns = showVotesColumns(
    addChange,
    cancelChange,
    getActionString,
    isWitnessTab
  );
  const componentRef = useRef<HTMLDivElement>(null);
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleReconfirmVoting,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  const renderCancelActionRows = (item: VoteRow) =>
    item.status === "unapproved" ? (
      <Styled.ApprovedStatus>
        {counterpart.translate(`pages.voting.status.pending_add`)}
      </Styled.ApprovedStatus>
    ) : (
      <Styled.NotApprovedStatus>
        {counterpart.translate(`pages.voting.status.pending_remove`)}
      </Styled.NotApprovedStatus>
    );

  const renderAddActionRows = (item: VoteRow) =>
    item.status === "unapproved" ? (
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
    );

  return (
    <Styled.VoteTableWrapper>
      <Styled.VoteHeaderBar>
        {type === "pendingChanges" ? (
          <Styled.Title>
            {counterpart.translate(`field.labels.pending_changes`, {
              localStorageAccount,
            })}
          </Styled.Title>
        ) : (
          <>
            <Styled.Title>
              {capitalize(counterpart.translate(`pages.voting.${tab}.heading`))}{" "}
            </Styled.Title>
            <SearchTableInput
              columns={columns as ColumnsType<unknown>}
              dataSource={votes}
              setDataSource={setSearchDataSource}
              inputProps={{
                placeholder: counterpart.translate(
                  `pages.blocks.${tab}.search_${tab}`
                ),
                suffix: <SearchOutlined />,
              }}
            />
            <Form.Provider onFormFinish={handleFormFinish}>
              <Form
                form={reconfirmVoteForm}
                name="reconfirmVoteForm"
                onFinish={showPasswordModal}
              >
                {proxy.id !== DEFAULT_PROXY_ID || !desiredMembers ? (
                  <Tooltip
                    placement="top"
                    title={
                      proxy.id !== DEFAULT_PROXY_ID
                        ? counterpart.translate(`tooltips.proxied_account`)
                        : counterpart.translate(`tooltips.zero_votes`)
                    }
                  >
                    <Styled.Reconfirm
                      type="primary"
                      htmlType="submit"
                      disabled={true}
                    >
                      {counterpart.translate(`buttons.reconfirm_votes`)}
                    </Styled.Reconfirm>
                  </Tooltip>
                ) : (
                  <Styled.Reconfirm type="primary" htmlType="submit">
                    {counterpart.translate(`buttons.reconfirm_votes`)}
                  </Styled.Reconfirm>
                )}

                <PasswordModal
                  visible={isPasswordModalVisible}
                  onCancel={hidePasswordModal}
                  neededKeyType="active"
                />
                <TransactionModal
                  visible={isTransactionModalVisible}
                  onCancel={hideTransactionModal}
                  transactionErrorMessage={transactionErrorMessage}
                  transactionSuccessMessage={transactionSuccessMessage}
                  loadingTransaction={loadingTransaction}
                  account={name}
                  fee={reconfirmFee}
                  transactionType="account_update"
                  proxy={proxy}
                  desiredMembers={desiredMembers}
                  memberType={tab}
                />
              </Form>
            </Form.Provider>
            <Styled.DownloadLinks>
              <DownloadOutlined />
              <ReactToPrint
                trigger={() => (
                  <a href="#">{counterpart.translate(`links.pdf`)}</a>
                )}
                content={() => componentRef.current as unknown as ReactInstance}
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
        )}
      </Styled.VoteHeaderBar>
      <Styled.Container>
        {sm ? (
          <Styled.VoteList
            itemLayout="vertical"
            dataSource={searchDataSource}
            loading={loading}
            pagination={
              renderPaginationConfig({
                loading,
                pageSize: 10,
                showSizeChanger: true,
              }) as false | PaginationConfig
            }
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
                          {(item as VoteRow).action === "cancel"
                            ? renderCancelActionRows(item as VoteRow)
                            : renderAddActionRows(item as VoteRow)}
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
                                  cancelChange((item as VoteRow).id);
                                } else {
                                  addChange((item as VoteRow).id);
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
                                    .translate(
                                      `pages.voting.actions.pending_add`
                                    )
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
                          {(item as VoteRow).action === "cancel"
                            ? renderCancelActionRows(item as VoteRow)
                            : renderAddActionRows(item as VoteRow)}
                        </span>
                      </div>
                      <div className="item-info">
                        <span className="item-info-title">
                          {columns[7].title()}
                        </span>
                        <span className="item-info-value">
                          {(item as VoteRow).action === "add" ||
                          (item as VoteRow).action === "remove" ||
                          (item as VoteRow).action === "cancel" ? (
                            <Styled.VoteActionButton
                              onClick={() => {
                                if ((item as VoteRow).action === "cancel") {
                                  cancelChange((item as VoteRow).id);
                                } else {
                                  addChange((item as VoteRow).id);
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
                                    .translate(
                                      `pages.voting.actions.pending_add`
                                    )
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
            pagination={
              renderPaginationConfig({
                loading,
                pageSize: 10,
                showSizeChanger: true,
              }) as false | TablePaginationConfig
            }
            size="small"
          />
        )}
      </Styled.Container>
      {type === "allVotes" ? (
        <Styled.PrintTable>
          <div ref={componentRef}>
            <Styled.VoteTable
              dataSource={votes}
              columns={columns as ColumnsType<unknown>}
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
