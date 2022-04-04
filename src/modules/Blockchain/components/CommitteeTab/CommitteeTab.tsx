import { StatsCard } from "../StatsCard";

import { CommitteeColumns } from "./CommitteeColumns";
import * as Styled from "./CommitteeTab.styled";
import { useCommitteeTab } from "./hooks";

export const CommitteeTab = (): JSX.Element => {
  const {
    loading,
    activeCommittee,
    committeeStats,
    committeeTableRows,
    searchValue,
    handleSearch,
  } = useCommitteeTab();

  return (
    <Styled.CommitteeTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeCommittee === 0}
          title="Active Committee"
          data={`${activeCommittee}`}
          statsData={committeeStats}
        />
      </Styled.StatsCardsDeck>
      <Styled.CommitteeSearch
        size="large"
        placeholder="Search Committee"
        onSearch={handleSearch}
        loading={loading}
      />
      <Styled.CommitteeTable
        bordered={false}
        dataSource={
          searchValue === ""
            ? committeeTableRows
            : committeeTableRows.filter((committeeRow) =>
                committeeRow.name
                  .toLowerCase()
                  .startsWith(searchValue.toLowerCase())
              )
        }
        columns={CommitteeColumns}
        loading={loading}
        pagination={false}
      />
    </Styled.CommitteeTabWrapper>
  );
};
