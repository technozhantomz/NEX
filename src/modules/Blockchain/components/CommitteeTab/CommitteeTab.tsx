import Link from "next/link";

import { useViewportContext } from "../../../../common/providers";
import { List } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { StatsCard } from "../StatsCard";

import { CommitteeColumns } from "./CommitteeColumns";
import * as ListStyled from "./CommitteeColumns.styled";
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
  const { width } = useViewportContext();
  return (
    <Styled.CommitteeTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeCommittee === 0}
          title="Active Committees"
          data={`${activeCommittee}`}
          statsData={committeeStats}
        />
      </Styled.StatsCardsDeck>
      <Styled.CommitteeSearch
        size="large"
        placeholder="Search Committees"
        onSearch={handleSearch}
        loading={loading}
      />
      {width > breakpoints.sm ? (
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
      ) : (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? committeeTableRows
              : committeeTableRows.filter((committeeRow) =>
                  committeeRow.name
                    .toLowerCase()
                    .startsWith(searchValue.toLowerCase())
                )
          }
          loading={loading}
          renderItem={(item) => (
            <Styled.CommiteeListItem key={item.key}>
              <Styled.CommiteeItemContent>
                <div className="commitee-info">
                  <span className="commitee-info-title">
                    {CommitteeColumns[0].title}
                  </span>
                  <span className="commitee-info-value">{item.rank}</span>
                </div>
                <div className="commitee-info">
                  <span className="commitee-info-title">
                    {CommitteeColumns[1].title}
                  </span>
                  <span className="commitee-info-value">
                    <Link href={`/user/${item.name}`}>{item.name}</Link>
                  </span>
                </div>
                <div className="commitee-info">
                  <span className="commitee-info-title">
                    {CommitteeColumns[2].title}
                  </span>
                  <span className="commitee-info-value">{item.totalVotes}</span>
                </div>
                <div className="commitee-info">
                  <span className="commitee-info-title">
                    {CommitteeColumns[3].title}
                  </span>
                  <span className="commitee-info-value">
                    <Link href={`${item.url}`} passHref>
                      <ListStyled.urlIcon rotate={45} />
                    </Link>
                  </span>
                </div>
              </Styled.CommiteeItemContent>
            </Styled.CommiteeListItem>
          )}
        />
      )}
    </Styled.CommitteeTabWrapper>
  );
};
