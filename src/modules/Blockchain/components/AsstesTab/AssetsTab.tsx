import Link from "next/link";

import { useViewportContext } from "../../../../common/components/ViewportProvider";
import { InfoCircleOutlined, List, Tag, Tooltip } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { StatsCard } from "../StatsCard";

import { AssetsColumns } from "./AssetsColumns";
import * as Styled from "./AssetsTab.styled";
import { useAssetsTab } from "./hooks";

export const AssetsTab = (): JSX.Element => {
  const { loading, assets, searchValue, onSearch } = useAssetsTab();
  const { width } = useViewportContext();

  return (
    <Styled.AssetsTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={assets.data.length === 0}
          title="Assets"
          data={`${assets.data.length}`}
          statsData={assets.stats}
        />
      </Styled.StatsCardsDeck>
      <Styled.AssetsSearch
        size="large"
        placeholder="Search Assets"
        onSearch={onSearch}
        loading={loading}
      />
      {width > breakpoints.sm ? (
        <Styled.AssetsTable
          bordered={false}
          dataSource={
            searchValue === ""
              ? assets.data
              : assets.data.filter((item) =>
                  item.symbol.toLowerCase().startsWith(searchValue)
                )
          }
          columns={AssetsColumns}
          loading={loading}
          pagination={false}
        />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? assets.data
              : assets.data.filter((item) =>
                  item.symbol.toLowerCase().startsWith(searchValue)
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
      )}
    </Styled.AssetsTabWrapper>
  );
};
