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

import { SonsColumns } from "./SonsColumns";
import * as Styled from "./SonsTab.styled";
import { SonsPrintTable } from "./SonstPrintTable";
import { useSonsTab } from "./hooks";

export const SonsTab = (): JSX.Element => {
  const {
    loading,
    sonsTableRows,
    searchDataSource,
    sonsStats,
    activeSons,
    setSearchDataSource,
  } = useSonsTab();
  const { sm } = useViewportContext();
  const componentRef = useRef();

  return (
    <Styled.SonsTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeSons === 0}
          title={counterpart.translate(`pages.blocks.sons.active_sons`)}
          data={`${activeSons}`}
          statsData={sonsStats.active}
        />
      </Styled.StatsCardsDeck>
      <Styled.SonsHeaderBar>
        <Styled.SonsHeader>
          {counterpart.translate(`pages.blocks.sons.sons`)}
          <InfoCircleOutlined />
        </Styled.SonsHeader>
        <SearchTableInput
          columns={SonsColumns}
          dataSource={sonsTableRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(`pages.blocks.sons.search_sons`),
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
            data={sonsTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.SonsHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
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
                    <Link href={`/user/${item.name}`}>{item.name}</Link>
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
                    <Link href={`${item.url}`} passHref>
                      <Styled.urlIcon rotate={45} />
                    </Link>
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
          columns={SonsColumns}
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
        <SonsPrintTable ref={componentRef} />
      </Styled.PrintTable>
    </Styled.SonsTabWrapper>
  );
};
