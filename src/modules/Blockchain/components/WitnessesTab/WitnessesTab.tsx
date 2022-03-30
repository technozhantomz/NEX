import Link from "next/link";

import { useViewportContext } from "../../../../common/components/ViewportProvider";
import { List } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { StatsCard } from "../StatsCard";

import { WitnessesColumns } from "./WitnessesColumns";
import * as ListStyled from "./WitnessesColumns.styled";
import * as Styled from "./WitnessesTab.styled";
import { useWitnessesTab } from "./hooks";

export const WitnessesTab = (): JSX.Element => {
  const { loading, witnesses, searchValue, onSearch } = useWitnessesTab();
  const { width } = useViewportContext();
console.log(witnesses)
  return (
    <Styled.WitnessesTabWrapper>
      <Styled.StatsCardsDeck>
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
          isRewardCard
          noData={witnesses.earnings === 0}
          title="Monthly Earnings"
          data={`${witnesses.earnings}`}
          statsData={witnesses.stats.earnings}
        />
      </Styled.StatsCardsDeck>
      <Styled.WitnessesSearch
        size="large"
        placeholder="Search Witnesses"
        onSearch={onSearch}
        loading={loading}
      />
      {width > breakpoints.sm ? (
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
      ) : (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? witnesses.data
              : witnesses.data.filter((item) =>
                  item.name.toLowerCase().startsWith(searchValue)
                )
          }
          loading={loading}
          renderItem={(item) => (
            <Styled.WitnessListItem key={item.key}>
              <Styled.WitnessItemContent>
                <div className="witness-info">
                  <span className="witness-info-title">
                    {WitnessesColumns[0].title}
                  </span>
                  <span className="witness-info-value">{item.rank}</span>
                </div>
                <div className="witness-info">
                  <span className="witness-info-title">
                    {WitnessesColumns[1].title}
                  </span>
                  <span className="witness-info-value">
                    <Link href={`/user/${item.name}`}>{item.name}</Link>
                  </span>
                </div>
                <div className="witness-info">
                  <span className="witness-info-title">
                    {WitnessesColumns[2].title}
                  </span>
                  <span className="witness-info-value">{item.totalVotes}</span>
                </div>
                <div className="witness-info">
                  <span className="witness-info-title">
                    {WitnessesColumns[3].title}
                  </span>
                  <span className="witness-info-value">
                    <ListStyled.LastBlock>
                      {item.lastBlock}
                    </ListStyled.LastBlock>
                  </span>
                </div>
                <div className="witness-info">
                  <span className="witness-info-title">
                    {WitnessesColumns[4].title}
                  </span>
                  <span className="witness-info-value">
                    <ListStyled.MissedBlocks>
                      {item.missedBlocks}
                    </ListStyled.MissedBlocks>
                  </span>
                </div>
                <div className="witness-info">
                  <span className="witness-info-title">
                    {WitnessesColumns[5].title}
                  </span>
                  <span className="witness-info-value">
                    <Link href={`${item.url}`} passHref>
                      <ListStyled.urlIcon rotate={45} />
                    </Link>
                  </span>
                </div>
              </Styled.WitnessItemContent>
            </Styled.WitnessListItem>
          )}
        />
      )}
    </Styled.WitnessesTabWrapper>
  );
};
