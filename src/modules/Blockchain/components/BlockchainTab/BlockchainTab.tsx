import Search from "antd/lib/input/Search";

import * as Styled from "./BlockchainTab.styled";
import { BlockCard, BlockTable } from "./components";
import { useBlockchainTab } from "./hooks";

export const BlockchainTab = (): JSX.Element => {
  const { loading, blockchainData, searchValue, onSearch } = useBlockchainTab();

  return (
    <div>
      <Styled.BlockCardsWrapper>
        <BlockCard
          noData={blockchainData.currentBlock === 0}
          title="Current Block"
          data={`${
            blockchainData.currentBlock > 0
              ? blockchainData.currentBlock
              : "no data"
          }`}
        />
        <BlockCard
          noData={blockchainData.supply.amount === 0}
          title={`Supply (${blockchainData.supply.symbol})`}
          data={`${
            blockchainData.supply.amount > 0
              ? blockchainData.supply.amount
              : "no data"
          }`}
        />
        <BlockCard
          noData={blockchainData.activeWitnesses.length === 0}
          title="Active Witness"
          data={`${
            blockchainData.activeWitnesses.length > 0
              ? blockchainData.activeWitnesses.length
              : "no data"
          }`}
        />
        <BlockCard
          isTimeCard={true}
          noData={blockchainData.avgTime === 0}
          title="Confimation Time"
          data={`${
            blockchainData.avgTime > 0
              ? blockchainData.avgTime / 1000 + ":00"
              : "no data"
          }`}
        />
      </Styled.BlockCardsWrapper>
      <Styled.BlockSearch
        size="large"
        placeholder="Search Blocks"
        onSearch={onSearch}
        loading={loading}
      />
      <div>
        <h3>Recent Blocks</h3>
      </div>
      <BlockTable
        searchValue={searchValue}
        blocks={blockchainData.recentBlocks}
        loading={loading}
      />
    </div>
  );
};
