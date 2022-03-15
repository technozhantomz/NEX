import Search from "antd/lib/input/Search";

import { BlockCard, BlockTable } from "./components";
import { useBlockchainTab } from "./hooks";

export const BlockchainTab = (): JSX.Element => {
  const { loading, blockchainData } = useBlockchainTab();

  return (
    <div>
      <div>
        <BlockCard
          title="Current Block"
          data={`${blockchainData.currentBlock}`}
        />
        <BlockCard
          title={`Supply (${blockchainData.supply.symbol})`}
          data={`${blockchainData.supply.amount}`}
        />
        <BlockCard
          title="Active Witness"
          data={`${blockchainData.activeWitnesses.length}`}
        />
        <BlockCard
          title="Confimation Time"
          data={`${blockchainData.avgTime / 1000}:00`}
        />
      </div>
      <Search placeholder="Search Blocks" loading={loading} />
      <div>
        <h3>Recent Blocks</h3>
      </div>
      <BlockTable blocks={blockchainData.recentBlocks} loading={loading} />
    </div>
  );
};
