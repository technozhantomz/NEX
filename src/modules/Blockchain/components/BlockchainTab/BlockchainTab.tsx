import { ParsedUrlQuery } from "querystring";

import counterpart from "counterpart";

import { StatsCard } from "../StatsCard";

import * as Styled from "./BlockchainTab.styled";
import { BlockTable } from "./components";
import { useBlockchainTab } from "./hooks";

type Props = {
  routerQuery: ParsedUrlQuery;
};
export const BlockchainTab = ({ routerQuery }: Props): JSX.Element => {
  const { loading, blockchainData, searchValue, searchResult, handleSearch } =
    useBlockchainTab(routerQuery);

  return (
    <Styled.BlockTabWrapper>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={blockchainData.currentBlock === 0}
          title={counterpart.translate(
            `transaction.pages.blocks.blockchain.current_block`
          )}
          data={`${blockchainData.currentBlock}`}
          statsData={blockchainData.stats.blocks}
        />
        <StatsCard
          noData={blockchainData.supply.amount === 0}
          title={counterpart.translate(
            `transaction.pages.blocks.blockchain.supply`,
            { symbol: blockchainData.supply.symbol }
          )}
          data={`${blockchainData.supply.amount}`}
          statsData={blockchainData.stats.supply}
        />
        <StatsCard
          noData={blockchainData.activeWitnesses.length === 0}
          title={counterpart.translate(
            `transaction.pages.blocks.blockchain.active_witness`
          )}
          data={`${blockchainData.activeWitnesses.length}`}
          statsData={blockchainData.stats.witnesses}
        />
        <StatsCard
          isTimeCard={true}
          noData={blockchainData.avgTime === 0}
          title={counterpart.translate(
            `transaction.pages.blocks.blockchain.confirmation_time`
          )}
          data={`${blockchainData.avgTime}`}
          statsData={blockchainData.stats.times}
        />
      </Styled.StatsCardsDeck>
      <Styled.BlockSearch
        size="large"
        placeholder={counterpart.translate(
          `transaction.pages.blocks.blockchain.search_blocks`
        )}
        onSearch={handleSearch}
        loading={loading}
      />
      <div>
        <h3>
          {counterpart.translate(
            `transaction.pages.blocks.blockchain.recent_blocks`
          )}
        </h3>
      </div>
      <BlockTable
        searchValue={searchValue}
        blocks={searchResult ? searchResult : blockchainData.recentBlocks}
        loading={loading}
      />
    </Styled.BlockTabWrapper>
  );
};
