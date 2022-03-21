import { StatsCard } from "../StatsCard";

import { CommitteeColumns } from "./CommitteeColumns";
import * as Styled from "./CommitteeTab.styled";
import { useCommitteeTab } from "./hooks";

export const CommitteeTab = (): JSX.Element => {
  const { loading, committee, searchValue, onSearch } = useCommitteeTab();

  return (
    <Styled.CommitteeTabWrapper>
      <Styled.StatsCardsWrapper>
        <StatsCard
          noData={committee.activeCommittee === 0}
          title="Active Committee"
          data={`${committee.activeCommittee}`}
          statsData={committee.stats.active}
        />
      </Styled.StatsCardsWrapper>
      <Styled.CommitteeSearch
        size="large"
        placeholder="Search Committee"
        onSearch={onSearch}
        loading={loading}
      />
      <Styled.CommitteeTable
        bordered={false}
        dataSource={
          searchValue === ""
            ? committee.data
            : committee.data.filter((item) =>
                item.name.toLowerCase().startsWith(searchValue)
              )
        }
        columns={CommitteeColumns}
        loading={loading}
        pagination={false}
      />
    </Styled.CommitteeTabWrapper>
  );
};
