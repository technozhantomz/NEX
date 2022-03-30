import { useEffect, useState } from "react";

import { useAsset, useBlockchain } from "../../../../../common/hooks";

import {
  BlockChainData,
  BlockTableRow,
  UseBlockchainTab,
} from "./useWitnessTab.types";

const defaultData = {
  currentBlock: 0,
  supply: {
    amount: 0,
    symbol: "",
  },
  activeWitnesses: [],
  avgTime: 0,
  recentBlocks: [],
  stats: {
    blocks: [],
    supply: [],
    witnesses: [],
    times: [],
  },
};

export function useWitnessTab(): UseBlockchainTab {
  const [searchValue, setSearchValue] = useState<string>("");
  const [blockchainData, setBlockchainData] =
    useState<BlockChainData>(defaultData);
  const [searchResult, setSearchResult] = useState<BlockTableRow[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { defaultAsset } = useAsset();
  const {
    getChainData,
    getBlockData,
    getDynamic,
    getRecentBlocks,
    getAvgBlockTime,
    getBlock,
  } = useBlockchain();

  useEffect(() => {
    const intervalTime =
      blockchainData.avgTime > 0 ? blockchainData.avgTime * 1000 : 3000;
    setInterval(() => getBlockchainData(), intervalTime);
  }, [defaultAsset]);

  const getBlockchainData = async () => {
    //setLoading(true);
    const recentBlocks = getRecentBlocks();
    const chainData = await getChainData();
    const blockData = await getBlockData();
    const dynamic = await getDynamic();
    const avgBlockTime = getAvgBlockTime();
    try {
      const blockRows = recentBlocks.map((block: any) => {
        return {
          key: block?.id.toString(),
          blockID: block?.id.toString(),
          time: block.timestamp.toLocaleTimeString(),
          witness: block.witness_account_name,
          transaction: block.transactions.length,
        };
      });
      if (defaultAsset) {
        setBlockchainData({
          currentBlock: blockData.head_block_number,
          supply: {
            amount:
              Number(dynamic.current_supply) / 10 ** defaultAsset.precision,
            symbol: defaultAsset.symbol,
          },
          activeWitnesses: chainData.active_witnesses,
          avgTime: Number(avgBlockTime.toFixed(0)),
          recentBlocks: blockRows,
          stats: {
            blocks: updateStatsArray(
              blockchainData.stats.blocks,
              blockData.head_block_number
            ),
            supply: updateStatsArray(
              blockchainData.stats.supply,
              Number(dynamic.current_supply) / 10 ** defaultAsset.precision
            ),
            witnesses: updateStatsArray(
              blockchainData.stats.witnesses,
              chainData.active_witnesses.length
            ),
            times: updateStatsArray(
              blockchainData.stats.times,
              Number(avgBlockTime.toFixed(0))
            ),
          },
        });
      }
      //setLoading(false);
    } catch (e) {
      console.log(e);
      //setLoading(false);
    }
  };

  const updateStatsArray = (arr: number[], value: number) => {
    if (arr.length >= 99) {
      arr.shift();
      arr.push(value);
      return arr;
    }
    arr.push(value);
    return arr;
  };

  const onSearch = async (value: string) => {
    setLoading(true);
    setSearchValue(value);
    const inRecents = blockchainData.recentBlocks.filter((block) =>
      block.key.startsWith(value)
    );
    if (inRecents.length > 0) {
      setSearchResult(undefined);
      setLoading(false);
    } else {
      const block = await getBlock(Number(value));
      setSearchResult([
        {
          key: value,
          blockID: value,
          time: new Date(block.timestamp).toLocaleTimeString(),
          witness: block.witness_account_name,
          transaction: block.transactions.length,
        },
      ]);
      setLoading(false);
    }
  };

  return {
    loading,
    blockchainData,
    searchValue,
    searchResult,
    onSearch,
  };
}
