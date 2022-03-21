import { StatsCard } from "../StatsCard";

import { WitnessesColumns } from "./WitnessesColumns";
import * as Styled from "./WitnessesTab.styled";
import { useWitnessesTab } from "./hooks";

export const WitnessesTab = (): JSX.Element => {
  const { loading, witnesses, searchValue, onSearch } = useWitnessesTab();

  return (
    <Styled.WitnessesTabWrapper>
      <Styled.StatsCardsWrapper>
        <StatsCard
          noData={witnesses.activeWitnesses === 0}
          title="Active Witnesses"
          data={`${witnesses.activeWitnesses}`}
          statsData={witnesses.stats.active}
        />
        <StatsCard
          isRewardCard
          noData={witnesses.reward === 0}
          title="Block Reward"
          data={`${witnesses.reward}`}
          statsData={witnesses.stats.reward}
        />
        <StatsCard
          noData={witnesses.earnings === 0}
          title="Monthly Earnings"
          data={`$${witnesses.earnings}`}
          statsData={witnesses.stats.earnings}
        />
      </Styled.StatsCardsWrapper>
      <Styled.WitnessesSearch
        size="large"
        placeholder="Search Witnesses"
        onSearch={onSearch}
        loading={loading}
      />
      <Styled.WitnessesTable
        bordered={false}
        dataSource={
          searchValue === ""
            ? witnesses.data
            : witnesses.data.filter((item) =>
                item.name.toLowerCase().startsWith(searchValue)
              )
        }
        columns={WitnessesColumns}
        loading={loading}
        pagination={false}
      />
    </Styled.WitnessesTabWrapper>
  );
};
