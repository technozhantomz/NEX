import Link from "next/link";

import { useViewportContext } from "../../../../common/components/ViewportProvider";
import { List } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { StatsCard } from "../StatsCard";

import { CommitteeColumns } from "./CommitteeColumns";
import * as ListStyled from "./CommitteeColumns.styled";
import * as Styled from "./CommitteeTab.styled";
import { useCommitteeTab } from "./hooks";

export const CommitteeTab = (): JSX.Element => {
  const { loading, committee, searchValue, onSearch } = useCommitteeTab();
  const { width } = useViewportContext();

  return (
    <Styled.CommitteeTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={committee.activeCommittee === 0}
          title="Active Committee"
          data={`${committee.activeCommittee}`}
          statsData={committee.stats.active}
        />
      </Styled.StatsCardsDeck>
      <Styled.CommitteeSearch
        size="large"
        placeholder="Search Committee"
        onSearch={onSearch}
        loading={loading}
      />
      {width > breakpoints.sm ? (
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
      ) : (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? committee.data
              : committee.data.filter((item) =>
                  item.name.toLowerCase().startsWith(searchValue)
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
