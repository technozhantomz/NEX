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
  Tag,
  Tooltip,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";
import { StatsCard } from "../../common";

import * as Styled from "./AssetsTab.styled";
import { AssetsPrintTable } from "./components";
import { useAssetsTab } from "./hooks";

export const AssetsTab = (): JSX.Element => {
  const {
    loading,
    assetsColumns,
    assetTableRows,
    assetsStats,
    searchDataSource,
    setSearchDataSource,
  } = useAssetsTab();
  const { sm } = useViewportContext();
  const componentRef = useRef();

  return (
    <Styled.AssetsTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={assetTableRows.length === 0}
          title={counterpart.translate(`pages.blocks.assets.assets`)}
          data={`${assetTableRows.length}`}
          statsData={assetsStats}
        />
      </Styled.StatsCardsDeck>
      <Styled.AssetHeaderBar>
        <Styled.AssetHeader>
          {counterpart.translate(`pages.blocks.assets.assets`)}
          <InfoCircleOutlined />
        </Styled.AssetHeader>
        <SearchTableInput
          columns={assetsColumns}
          dataSource={assetTableRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.assets.search_assets`
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
            filename={"AssetsTable.csv"}
            data={assetTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.AssetHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          renderItem={(item) => (
            <Styled.AssetListItem key={item.key}>
              <Styled.AssetItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[0].title()}
                  </span>
                  <span className="item-info-value">{item.id}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[1].title()}
                  </span>
                  <span className="item-info-value">
                    <Tag key={item.symbol} bgColor={colors.assetTag}>
                      {item.symbol}
                    </Tag>
                  </span>
                </div>
                {/* <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[2].title()}
                  </span>
                  <span className="item-info-value">{item.name}</span>
                </div> */}
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[2].title()}
                  </span>
                  <span className="item-info-value">{item.maxSupply}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[3].title()}
                  </span>
                  <span className="item-info-value">{item.precision}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[4].title()}
                  </span>
                  <span className="item-info-value">
                    <Link href={`/user/${item.issuer}`}>{item.issuer}</Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[5].title()}
                  </span>
                  <span className="item-info-value">
                    {!item.info || item.info === "" ? (
                      <span>
                        {counterpart.translate(`field.labels.not_available`)}
                      </span>
                    ) : (
                      <Tooltip placement="top" title={item.info}>
                        <InfoCircleOutlined />
                      </Tooltip>
                    )}
                  </span>
                </div>
              </Styled.AssetItemContent>
            </Styled.AssetListItem>
          )}
        />
      ) : (
        <Styled.AssetsTable
          dataSource={searchDataSource}
          columns={assetsColumns}
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
        <AssetsPrintTable ref={componentRef} />
      </Styled.PrintTable>
    </Styled.AssetsTabWrapper>
  );
};
