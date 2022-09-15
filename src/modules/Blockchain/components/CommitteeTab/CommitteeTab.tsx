import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import Link from "next/link";
import { CSSProperties, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { useViewportContext } from "../../../../common/providers";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  List,
  SearchOutlined,
} from "../../../../ui/src";
import { StatsCard } from "../StatsCard";

import { CommitteeColumns } from "./CommitteeColumns";
import { CommitteePrintTable } from "./CommitteePrintTable";
import * as Styled from "./CommitteeTab.styled";
import { useCommitteeTab } from "./hooks";

export const CommitteeTab = (): JSX.Element => {
  const {
    loading,
    activeCommittee,
    committeeStats,
    committeeTableRows,
    searchDataSource,
    setSearchDataSource,
  } = useCommitteeTab();
  const { sm } = useViewportContext();
  const componentRef = useRef();

  return (
    <Styled.CommitteeTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeCommittee === 0}
          title={counterpart.translate(
            `pages.blocks.committees.active_committees`
          )}
          data={`${activeCommittee}`}
          statsData={committeeStats}
        />
      </Styled.StatsCardsDeck>
      <Styled.CommitteeHeaderBar>
        <Styled.CommitteeHeader>
          {counterpart.translate(`pages.blocks.committees.committees`)}
          <InfoCircleOutlined />
        </Styled.CommitteeHeader>
        <SearchTableInput
          columns={CommitteeColumns}
          dataSource={committeeTableRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.committees.search_committees`
            ),
            suffix: <SearchOutlined />,
          }}
        />
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current}
          />

          {` / `}
          <CSVLink
            filename={"SonsTable.csv"}
            data={committeeTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.CommitteeHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          renderItem={(item) => (
            <Styled.CommiteeListItem key={item.key}>
              <Styled.CommiteeItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {CommitteeColumns[0].title()}
                  </span>
                  <span className="item-info-value">{item.rank}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {CommitteeColumns[1].title()}
                  </span>
                  <span className="item-info-value">
                    <Link href={`/user/${item.name}`}>{item.name}</Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {CommitteeColumns[2].title()}
                  </span>
                  <span className="item-info-value">
                    {item.active === true ? <Styled.ActiveIcon /> : ``}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {CommitteeColumns[3].title()}
                  </span>
                  <span className="item-info-value">
                    <Link href={`${item.url}`} passHref>
                      <Styled.urlIcon rotate={45} />
                    </Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {CommitteeColumns[4].title()}
                  </span>
                  <span className="item-info-value">{item.totalVotes}</span>
                </div>
              </Styled.CommiteeItemContent>
            </Styled.CommiteeListItem>
          )}
        />
      ) : (
        <Styled.CommitteeTable
          dataSource={searchDataSource}
          columns={CommitteeColumns}
          loading={loading}
          pagination={
            !loading
              ? {
                  showSizeChanger: false,
                  size: "small",
                  pageSize: 15,
                  showLessItems: true,
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
                }
              : false
          }
        />
      )}
      <Styled.PrintTable>
        <CommitteePrintTable ref={componentRef} />
      </Styled.PrintTable>
    </Styled.CommitteeTabWrapper>
  );
};
