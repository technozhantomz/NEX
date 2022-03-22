import { StatsCard } from "../StatsCard";

import { AssetsColumns } from "./AssetsColumns";
import * as Styled from "./AssetsTab.styled";
import { useAssetsTab } from "./hooks";

export const AssetsTab = (): JSX.Element => {
  const { loading, assets, searchValue, onSearch } = useAssetsTab();

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
    </Styled.AssetsTabWrapper>
  );
};
