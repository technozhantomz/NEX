import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { useRef } from "react";

import {
  renderPaginationItem,
  TableDownloader,
} from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { InfoCircleOutlined, List, SearchOutlined } from "../../../../ui/src";
import { StatsCard } from "../../common";

import * as Styled from "./CommitteeTab.styled";
import { CommitteeColumns, CommitteePrintTable } from "./components";
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
  const componentRef = useRef<HTMLDivElement>(null);

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
          columns={CommitteeColumns as ColumnsType<unknown>}
          dataSource={committeeTableRows ?? []}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.committees.search_committees`
            ),
            suffix: <SearchOutlined />,
          }}
        />
        <TableDownloader
          componentRef={componentRef}
          data={committeeTableRows}
        ></TableDownloader>
      </Styled.CommitteeHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading && !committeeTableRows}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 5,
            defaultCurrent: 1,
            showLessItems: true,
            showSizeChanger: false,
            size: "small",
            itemRender: renderPaginationItem(),
          }}
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
                    <Link href={`/user/${item.name}`} target="_blank">
                      {item.name}
                    </Link>
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
                    <a href={`${item.url}`} target="_blank">
                      <Styled.urlIcon rotate={45} />
                    </a>
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
          columns={CommitteeColumns as ColumnsType<unknown>}
          loading={loading && !committeeTableRows}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 15,
            defaultCurrent: 1,
            showSizeChanger: false,
            showLessItems: true,
            size: "small",
            itemRender: renderPaginationItem(),
          }}
        />
      )}
      <Styled.PrintTable>
        <CommitteePrintTable
          ref={componentRef}
          loading={loading && !committeeTableRows}
          committeeColumns={CommitteeColumns}
          committeeTableRows={committeeTableRows ?? []}
        />
      </Styled.PrintTable>
    </Styled.CommitteeTabWrapper>
  );
};
