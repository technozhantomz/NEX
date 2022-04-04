import { StatsCard } from "../StatsCard";

import { WitnessesColumns } from "./WitnessesColumns";
import * as Styled from "./WitnessesTab.styled";
import { useWitnessesTab } from "./hooks";

export const WitnessesTab = (): JSX.Element => {
  const {
    loading,
    witnessStats,
    witnessTableRows,
    activeWitnesses,
    earnings,
    reward,
    searchValue,
    handleSearch,
  } = useWitnessesTab();

  return (
    <Styled.WitnessesTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeWitnesses === 0}
          title="Active Witnesses"
          data={`${activeWitnesses}`}
          statsData={witnessStats.active}
        />
        <StatsCard
          isRewardCard
          noData={reward === 0}
          title="Block Reward"
          data={`${reward}`}
          statsData={witnessStats.reward}
        />
        <StatsCard
          isRewardCard
          noData={earnings === 0}
          title="Monthly Earnings"
          data={`${earnings}`}
          statsData={witnessStats.earnings}
        />
      </Styled.StatsCardsDeck>
      <Styled.WitnessesSearch
        size="large"
        placeholder="Search Witnesses"
        onSearch={handleSearch}
        loading={loading}
      />
      <Styled.WitnessesTable
        bordered={false}
        dataSource={
          searchValue === ""
            ? witnessTableRows
            : witnessTableRows.filter((witnessRow) =>
                witnessRow.name
                  .toLowerCase()
                  .startsWith(searchValue.toLowerCase())
              )
        }
        columns={WitnessesColumns}
        loading={loading}
        pagination={false}
      />
    </Styled.WitnessesTabWrapper>
  );
};
