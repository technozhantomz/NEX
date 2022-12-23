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

import * as Styled from "./SonsTab.styled";
import { SonsColumns, SonsPrintTable } from "./components";
import { useSonsTab } from "./hooks";

export const SonsTab = (): JSX.Element => {
  const {
    loading,
    sonsTableRows,
    searchDataSource,
    sonsStats,
    activeSons,
    budget,
    nextVote,
    setSearchDataSource,
  } = useSonsTab();
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.SonsTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeSons === 0}
          title={counterpart.translate(`pages.blocks.sons.active_sons`)}
          data={`${activeSons}`}
          statsData={sonsStats.active}
        />
        <StatsCard
          isRewardCard
          noData={budget === 0}
          title={counterpart.translate(`pages.blocks.stats_cards.budget`)}
          data={`${budget}`}
          statsData={sonsStats.budget}
        />
        <StatsCard
          noData={nextVote === ""}
          title={counterpart.translate(`pages.blocks.stats_cards.next_vote`)}
          data={nextVote}
          statsData={sonsStats.nextVote}
        />
      </Styled.StatsCardsDeck>
      <Styled.SonsHeaderBar>
        <Styled.SonsHeader>
          {counterpart.translate(`pages.blocks.sons.sons`)}
          <InfoCircleOutlined />
        </Styled.SonsHeader>
        <SearchTableInput
          columns={SonsColumns as ColumnsType<unknown>}
          dataSource={sonsTableRows ?? []}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(`pages.blocks.sons.search_sons`),
            suffix: <SearchOutlined />,
          }}
        />
        <TableDownloader
          componentRef={componentRef}
          data={sonsTableRows}
        ></TableDownloader>
      </Styled.SonsHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading && !sonsTableRows}
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
            <Styled.SonListItem key={item.key}>
              <Styled.SonItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {SonsColumns[0].title()}
                  </span>
                  <span className="item-info-value">{item.rank}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {SonsColumns[1].title()}
                  </span>
                  <span className="item-info-value">
                    <Link target="_blank" href={`/user/${item.name}`}>
                      {item.name}
                    </Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {SonsColumns[2].title()}
                  </span>
                  <span className="item-info-value">
                    {item.active === true ? <Styled.ActiveIcon /> : ``}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {SonsColumns[3].title()}
                  </span>
                  <span className="item-info-value">
                    <a target="_blank" href={`${item.url}`}>
                      <Styled.urlIcon rotate={45} />
                    </a>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {SonsColumns[4].title()}
                  </span>
                  <span className="item-info-value">{item.totalVotes}</span>
                </div>
              </Styled.SonItemContent>
            </Styled.SonListItem>
          )}
        />
      ) : (
        <Styled.SonsTable
          dataSource={searchDataSource}
          columns={SonsColumns as ColumnsType<unknown>}
          loading={loading && !sonsTableRows}
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
        <SonsPrintTable
          ref={componentRef}
          loading={loading && !sonsTableRows}
          sonsTableRows={sonsTableRows ?? []}
          sonsColumns={SonsColumns}
        />
      </Styled.PrintTable>
    </Styled.SonsTabWrapper>
  );
};
