import { StatsCard } from "../StatsCard";

import { AssetsColumns } from "./AssetsColumns";
import * as Styled from "./AssetsTab.styled";
import { useAssetsTab } from "./hooks";

export const AssetsTab = (): JSX.Element => {
  const { loading, assetTableRows, searchValue, handleSearch, assetsStats } =
    useAssetsTab();

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
      <Styled.AssetsTable
        bordered={false}
        dataSource={
          searchValue === ""
            ? assetTableRows
            : assetTableRows.filter((item) =>
                item.symbol.toLowerCase().startsWith(searchValue.toLowerCase())
              )
        }
        columns={AssetsColumns}
        loading={loading}
        pagination={false}
      />
    </Styled.AssetsTabWrapper>
  );
};
