import Link from "next/link";

import { useViewportContext } from "../../../../common/providers";
import { List } from "../../../../ui/src";
import { StatsCard } from "../StatsCard";

import { WitnessesColumns } from "./WitnessesColumns";
import * as ListStyled from "./WitnessesColumns.styled";
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
  const { sm } = useViewportContext();

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
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? witnessTableRows
              : witnessTableRows.filter((witnessRow) =>
                  witnessRow.name
                    .toLowerCase()
                    .startsWith(searchValue.toLowerCase())
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
      ) : (
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
      )}
    </Styled.WitnessesTabWrapper>
  );
};
