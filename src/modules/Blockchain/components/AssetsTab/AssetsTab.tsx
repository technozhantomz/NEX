import Link from "next/link";

import { useViewportContext } from "../../../../common/providers";
import { InfoCircleOutlined, List, Tag, Tooltip } from "../../../../ui/src";
import { StatsCard } from "../StatsCard";

import { AssetsColumns } from "./AssetsColumns";
import * as Styled from "./AssetsTab.styled";
import { useAssetsTab } from "./hooks";

export const AssetsTab = (): JSX.Element => {
  const { loading, assetTableRows, searchValue, handleSearch, assetsStats } =
    useAssetsTab();
  const { sm } = useViewportContext();

  return (
    <Styled.AssetsTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={assetTableRows.length === 0}
          title="Assets"
          data={`${assetTableRows.length}`}
          statsData={assetsStats}
        />
      </Styled.StatsCardsDeck>
      <Styled.AssetsSearch
        size="large"
        placeholder="Search Assets"
        onSearch={handleSearch}
        loading={loading}
      />
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? assetTableRows
              : assetTableRows.filter((item) =>
                  item.symbol
                    .toLowerCase()
                    .startsWith(searchValue.toLowerCase())
                )
          }
          loading={loading}
          renderItem={(item) => (
            <Styled.AssetListItem key={item.key}>
              <Styled.AssetItemContent>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {AssetsColumns[0].title}
                  </span>
                  <span className="asset-info-value">{item.id}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {AssetsColumns[1].title}
                  </span>
                  <span className="asset-info-value">
                    <Tag key={item.symbol}>{item.symbol}</Tag>
                  </span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {AssetsColumns[2].title}
                  </span>
                  <span className="asset-info-value">{item.maxSupply}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {AssetsColumns[3].title}
                  </span>
                  <span className="asset-info-value">{item.percision}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {AssetsColumns[4].title}
                  </span>
                  <span className="asset-info-value">
                    <Link href={`/user/${item.issuer}`}>{item.issuer}</Link>
                  </span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {AssetsColumns[5].title}
                  </span>
                  <span className="asset-info-value">
                    <Tooltip placement="top" title={item.info}>
                      <InfoCircleOutlined />
                    </Tooltip>
                  </span>
                </div>
              </Styled.AssetItemContent>
            </Styled.AssetListItem>
          )}
        />
      ) : (
        <Styled.AssetsTable
          bordered={false}
          dataSource={
            searchValue === ""
              ? assetTableRows
              : assetTableRows.filter((item) =>
                  item.symbol
                    .toLowerCase()
                    .startsWith(searchValue.toLowerCase())
                )
          }
          columns={AssetsColumns}
          loading={loading}
          pagination={false}
        />
      )}
    </Styled.AssetsTabWrapper>
  );
};
