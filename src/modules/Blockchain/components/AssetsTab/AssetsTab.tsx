import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import Link from "next/link";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationItem } from "../../../../common/components";
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
import { AssetTableRow, useAssetsTab } from "./hooks";

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
  const componentRef = useRef<HTMLDivElement>(null);

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
          columns={assetsColumns as ColumnsType<AssetTableRow>}
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
            content={() => componentRef.current as unknown as ReactInstance}
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
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[2].title()}
                  </span>
                  <span className="item-info-value">{item.name}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[3].title()}
                  </span>
                  <span className="item-info-value">{item.maxSupply}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[4].title()}
                  </span>
                  <span className="item-info-value">{item.precision}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[5].title()}
                  </span>
                  <span className="item-info-value">
                    <Link href={`/user/${item.issuer}`} target="_blank">
                      {item.issuer}
                    </Link>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {assetsColumns[6].title()}
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
          columns={assetsColumns as ColumnsType<AssetTableRow>}
          loading={loading}
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
        <AssetsPrintTable
          ref={componentRef}
          assetTableRows={assetTableRows}
          loading={loading}
          assetsColumns={assetsColumns}
        />
      </Styled.PrintTable>
    </Styled.AssetsTabWrapper>
  );
};
