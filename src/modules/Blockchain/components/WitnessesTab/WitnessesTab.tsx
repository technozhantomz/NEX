import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { CSSProperties, ReactInstance, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { useViewportContext } from "../../../../common/providers";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  List,
  SearchOutlined,
  Tooltip,
} from "../../../../ui/src";
import { Key } from "../../../../ui/src/icons";
import { StatsCard } from "../../common";

import * as Styled from "./WitnessesTab.styled";
import { WitnessesColumns, WitnessesPrintTable } from "./components";
import { useWitnessesTab } from "./hooks";

export const WitnessesTab = (): JSX.Element => {
  const {
    loading,
    witnessTableRows,
    witnessStats,
    activeWitnesses,
    reward,
    earnings,
    budget,
    nextVote,
    currentWitness,
    searchDataSource,
    setSearchDataSource,
  } = useWitnessesTab();
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.WitnessesTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={activeWitnesses === 0}
          title={counterpart.translate(
            `pages.blocks.witnesses.active_witnesses`
          )}
          data={`${activeWitnesses}`}
          statsData={witnessStats.active}
        />
        <StatsCard
          isRewardCard
          noData={reward === 0}
          title={counterpart.translate(`pages.blocks.witnesses.block_reward`)}
          data={`${reward}`}
          statsData={witnessStats.reward}
        />
        <StatsCard
          isRewardCard
          noData={earnings === 0}
          title={counterpart.translate(
            `pages.blocks.witnesses.monthly_earnings`
          )}
          data={`${earnings}`}
          statsData={witnessStats.earnings}
        />
        <StatsCard
          isRewardCard
          noData={budget === 0}
          title={counterpart.translate(`pages.blocks.stats_cards.budget`)}
          data={`${budget}`}
          statsData={witnessStats.budget}
        />
        <StatsCard
          noData={nextVote === ""}
          title={counterpart.translate(`pages.blocks.stats_cards.next_vote`)}
          data={nextVote}
          statsData={witnessStats.nextVote}
        />
        <StatsCard
          noData={currentWitness === ""}
          title={counterpart.translate(
            `pages.blocks.witnesses.current_witness`
          )}
          data={currentWitness}
        />
      </Styled.StatsCardsDeck>
      <Styled.WitnessesHeaderBar>
        <Styled.WitnessesHeader>
          {counterpart.translate(`pages.blocks.witnesses.witnesses`)}
          <InfoCircleOutlined />
        </Styled.WitnessesHeader>
        <SearchTableInput
          columns={WitnessesColumns as ColumnsType<unknown>}
          dataSource={witnessTableRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.blocks.witnesses.search_witnesses`
            ),
            suffix: <SearchOutlined />,
          }}
        />
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current as unknown as ReactInstance}
          />

          {` / `}
          <CSVLink
            filename={"WitnessesTable.csv"}
            data={witnessTableRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.WitnessesHeaderBar>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          renderItem={(item) => (
            <Styled.WitnessListItem key={item.key}>
              <Styled.WitnessesItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[0].title()}
                  </span>
                  <span className="item-info-value">{item.rank}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[1].title()}
                  </span>
                  <span className="item-info-value">
                    <a href={`/user/${item.name}`} target="_blank">
                      {item.name}
                    </a>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[2].title()}
                  </span>
                  <span className="item-info-value">
                    {item.active === true ? <Styled.ActiveIcon /> : ``}
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[3].title()}
                  </span>
                  <span className="item-info-value">{item.totalVotes}</span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[4].title()}
                  </span>
                  <span className="item-info-value">
                    <Styled.LastBlock>{item.lastBlock}</Styled.LastBlock>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[5].title()}
                  </span>
                  <span className="item-info-value">
                    <Styled.MissedBlocks>
                      {item.missedBlocks}
                    </Styled.MissedBlocks>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[6].title()}
                  </span>
                  <span className="item-info-value">
                    <a href={`${item.url}`} target="_blank">
                      <Styled.urlIcon rotate={45} />
                    </a>
                  </span>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {WitnessesColumns[7].title()}
                  </span>
                  <span className="item-info-value">
                    <Tooltip placement="top" title={item.publicKey}>
                      <span>
                        <Key />
                      </span>
                    </Tooltip>
                  </span>
                </div>
              </Styled.WitnessesItemContent>
            </Styled.WitnessListItem>
          )}
        />
      ) : (
        <Styled.WitnessesTable
          dataSource={searchDataSource}
          columns={WitnessesColumns as ColumnsType<unknown>}
          loading={loading}
          pagination={
            !loading
              ? {
                  showSizeChanger: false,
                  size: "small",
                  pageSize: 15,
                  showLessItems: true,
                  itemRender: (
                    _page: number,
                    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                    element: ReactNode
                  ) => {
                    if (type === "prev") {
                      return (
                        <a style={{ marginRight: "8px" } as CSSProperties}>
                          {counterpart.translate(`buttons.previous`)}
                        </a>
                      );
                    }
                    if (type === "next") {
                      return (
                        <a style={{ marginLeft: "8px" } as CSSProperties}>
                          {counterpart.translate(`buttons.next`)}
                        </a>
                      );
                    }
                    return element;
                  },
                }
              : false
          }
        />
      )}
      <Styled.PrintTable>
        <WitnessesPrintTable ref={componentRef} />
      </Styled.PrintTable>
    </Styled.WitnessesTabWrapper>
  );
};
