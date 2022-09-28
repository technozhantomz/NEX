import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { capitalize } from "lodash";
import Link from "next/link";
import { CSSProperties, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { useViewportContext } from "../../../../../../common/providers";
import { DownloadOutlined, SearchOutlined } from "../../../../../../ui/src";

import * as Styled from "./ProxyTable.styled";
import { ProxyColumns } from "./components";
import { useProxyTable } from "./hooks";
import { ProxyRow } from "./hooks/useProxyTable.types";

type Props = {
  loading: boolean;
  proxyVotes: ProxyRow[];
  type: "pendingChanges" | "allVotes";
  addChange: (voteId: string) => void;
  cancelChange: (voteId: string) => void;
};

export const ProxyTable = ({
  loading,
  proxyVotes,
  type,
  addChange,
  cancelChange,
}: Props): JSX.Element => {
  const { sm } = useViewportContext();
  const { searchDataSource, setSearchDataSource, getActionString } =
    useProxyTable({ proxyVotes });
  const columns = ProxyColumns(addChange, cancelChange, getActionString, type);
  const componentRef = useRef();

  return (
    <Styled.ProxyTableWrapper>
      <Styled.ProxyHeaderBar>
        <Styled.ProxyHeader>
          {type === "pendingChanges"
            ? counterpart.translate(`field.labels.pending_changes`)
            : capitalize(
                counterpart.translate(`field.labels.peerplays_accounts`)
              )}
        </Styled.ProxyHeader>
        {type === "allVotes" ? (
          <>
            <SearchTableInput
              columns={columns}
              dataSource={proxyVotes}
              setDataSource={setSearchDataSource}
              inputProps={{
                placeholder: counterpart.translate(
                  `field.placeholder.search_accounts`
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
                filename={"ProxyVotesTable.csv"}
                data={proxyVotes}
                className="btn btn-primary"
              >
                {counterpart.translate(`links.csv`)}
              </CSVLink>
            </Styled.DownloadLinks>
          </>
        ) : (
          ""
        )}
      </Styled.ProxyHeaderBar>
      {sm ? (
        <Styled.ProxyList
          loading={loading}
          dataSource={searchDataSource}
          renderItem={(item) => (
            <Styled.ProxyListItem key="item.id">
              <Styled.ProxyListItemContent>
                <div className="item-info">
                  <span className="item-info-title">{columns[0].title()}</span>
                  <span className="item-info-value">
                    <Link href={`/user/${(item as ProxyRow).name}`}>
                      {(item as ProxyRow).name}
                    </Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">{columns[1].title()}</span>
                  <span className="item-info-value">
                    {(item as ProxyRow).witnessVotes}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">{columns[2].title()}</span>
                  <span className="item-info-value">
                    {(item as ProxyRow).sonsVotes}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">{columns[3].title()}</span>
                  <span className="item-info-value">
                    {(item as ProxyRow).committeeVotes}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">{columns[4].title()}</span>
                  <span className="item-info-value">
                    {(item as ProxyRow).lastVoted}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">{columns[5].title()}</span>
                  <span className="item-info-value">
                    {(item as ProxyRow).action === "cancel" ? (
                      (item as ProxyRow).status === "unapproved" ? (
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
                    ) : (item as ProxyRow).status === "unapproved" ? (
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
                  <span className="item-info-title">{columns[6].title()}</span>
                  <span className="item-info-value">
                    {(item as ProxyRow).action === "add" ||
                    (item as ProxyRow).action === "remove" ||
                    (item as ProxyRow).action === "cancel" ? (
                      <Styled.ProxyTableActionButton
                        onClick={() => {
                          if ((item as ProxyRow).action === "cancel") {
                            cancelChange((item as ProxyRow).id as string);
                          } else {
                            addChange((item as ProxyRow).id as string);
                          }
                        }}
                      >
                        {getActionString(
                          (item as ProxyRow).action
                        ).toUpperCase()}
                      </Styled.ProxyTableActionButton>
                    ) : (
                      <span>
                        {(item as ProxyRow).action === "pending add"
                          ? counterpart
                              .translate(`pages.voting.actions.pending_add`)
                              .toUpperCase()
                          : counterpart
                              .translate(`pages.voting.actions.pending_remove`)
                              .toUpperCase()}
                      </span>
                    )}
                  </span>
                </div>
              </Styled.ProxyListItemContent>
            </Styled.ProxyListItem>
          )}
        />
      ) : (
        <Styled.ProxyTable
          columns={columns}
          dataSource={searchDataSource}
          loading={loading}
          rowKey="id"
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
      {type === "allVotes" ? (
        <Styled.PrintTable>
          <div ref={componentRef}>
            <Styled.ProxyTable
              dataSource={proxyVotes}
              columns={columns}
              loading={loading}
              pagination={false}
            />
          </div>
        </Styled.PrintTable>
      ) : (
        ""
      )}
    </Styled.ProxyTableWrapper>
  );
};
