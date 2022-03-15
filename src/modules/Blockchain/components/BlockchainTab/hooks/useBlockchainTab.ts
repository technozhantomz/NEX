import { ChainStore } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import { useAsset, useBlockchain } from "../../../../../common/hooks";

import { BlockChainData, UseBlockchainTab } from "./useBlockchainTab.types";

const defaultData = {
  currentBlock: 0,
  supply: {
    amount: 0,
    symbol: "",
  },
  activeWitnesses: [],
  avgTime: 3000,
  recentBlocks: [],
};

export function useBlockchainTab(): UseBlockchainTab {
  const [blockchainData, setBlockchainData] =
    useState<BlockChainData>(defaultData);
  const [loading, setLoading] = useState<boolean>(false);
  const { defaultAsset } = useAsset();
  const { getChainData, getBlockData, getDynamic } = useBlockchain();

  useEffect(() => {
    setInterval(() => getBlockchainData(), blockchainData.avgTime);
  }, [blockchainData, defaultAsset]);

  const getBlockchainData = async () => {
    setLoading(true);
    let recentBlocks = ChainStore.getRecentBlocks();
    const chainData = await getChainData();
    const blockData = await getBlockData();
    const dynamic = await getDynamic();
    try {
      recentBlocks = recentBlocks.toJS().sort((a, b) => a.id > b.id);

      let blockTimes = [],
        previousTime;

      recentBlocks.forEach((block, index) => {
        if (index > 0) {
          const delta = (previousTime - block.timestamp) / 1000;

          blockTimes.push([block.id, delta]);
        }

        previousTime = block.timestamp;
      });

      const chainAvgTime =
        blockTimes.reduce((previous, current, _idx, array) => {
          return previous + current[1] / array.length;
        }, 0) * 1000;

      const blockRows = recentBlocks.map((block) => {
        return {
          blockID: block.id,
          time: block.timestamp.toLocaleTimeString(),
          witness: block.witness_account_name,
          transaction: block.transactions.length,
        };
      });
      setBlockchainData({
        currentBlock: chainData.head_block_number,
        supply: {
          amount: dynamic.current_supply / 10 ** defaultAsset.precision,
          symbol: defaultAsset.symbol,
        },
        activeWitnesses: blockData.active_witnesses,
        avgTime: Number(chainAvgTime.toFixed(0)),
        recentBlocks: blockRows,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return {
    loading,
    blockchainData,
  };
}
