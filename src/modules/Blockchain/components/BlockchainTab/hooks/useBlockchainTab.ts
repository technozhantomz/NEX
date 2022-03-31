import { ParsedUrlQuery } from "querystring";

import { ChainStore } from "peerplaysjs-lib";
import { useCallback, useEffect, useState } from "react";

import { useAsset, useBlockchain } from "../../../../../common/hooks";
import { Block } from "../../../../../common/types";
import { BlockTableRow } from "../../../types";

import {
  BlockChainData,
  UseBlockchainTabResult,
} from "./useBlockchainTab.types";

const defaultData: BlockChainData = {
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

export function useBlockchainTab(
  routerQuery: ParsedUrlQuery
): UseBlockchainTabResult {
  const [searchValue, setSearchValue] = useState<string>("");
  const [blockchainData, setBlockchainData] =
    useState<BlockChainData>(defaultData);
  const [searchResult, setSearchResult] = useState<BlockTableRow[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { defaultAsset } = useAsset();
  const { getChain, getBlockData, getDynamic, getBlock } = useBlockchain();

  const getBlockchainData = useCallback(async () => {
    try {
      let recentBlocks: Block[] = ChainStore.getRecentBlocks().toJS();

      const chain = await getChain();
      const blockData = await getBlockData();
      const dynamic = await getDynamic();
      recentBlocks = recentBlocks.sort(
        (a, b) => (b.id as number) - (a.id as number)
      );

      const blockTimes: [number, number][] = [[0, 0]];
      let previousTime: number;

      recentBlocks.forEach((block, index: number) => {
        if (index > 0) {
          const delta =
            (previousTime -
              new Date(block.timestamp.toLocaleString()).getTime()) /
            1000;

          blockTimes.push([block.id as number, delta]);
        }

        previousTime = new Date(block.timestamp.toLocaleString()).getTime();
      });

      const chainAvgTime = blockTimes.reduce(
        (previous, current, _idx, array) => {
          return previous + current[1] / array.length;
        },
        0
      );

      const blockRows = recentBlocks.map((block) => {
        return {
          key: (block.id as number).toString(),
          blockID: (block.id as number).toString(),
          time: new Date(block.timestamp.toLocaleString()).toLocaleTimeString(),
          witness: block.witness_account_name,
          transaction: block.transactions.length,
        };
      });

      if (defaultAsset && chain && blockData && dynamic) {
        setBlockchainData({
          currentBlock: chain.head_block_number,
          supply: {
            amount:
              Number(dynamic.current_supply) / 10 ** defaultAsset.precision,
            symbol: defaultAsset.symbol,
          },
          activeWitnesses: blockData.active_witnesses,
          avgTime: Number(chainAvgTime.toFixed(0)),
          recentBlocks: blockRows,
          stats: {
            blocks: updateStatsArray(
              blockchainData.stats.blocks,
              chain.head_block_number
            ),
            supply: updateStatsArray(
              blockchainData.stats.supply,
              Number(dynamic.current_supply) / 10 ** defaultAsset.precision
            ),
            witnesses: updateStatsArray(
              blockchainData.stats.witnesses,
              blockData.active_witnesses.length
            ),
            times: updateStatsArray(
              blockchainData.stats.times,
              Number(chainAvgTime.toFixed(0))
            ),
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [getChain, getBlockData, getDynamic, setBlockchainData, defaultAsset]);

  const updateStatsArray = useCallback((arr: number[], value: number) => {
    if (arr.length >= 99) {
      arr.shift();
      arr.push(value);
      return arr;
    }
    arr.push(value);
    return arr;
  }, []);

  const handleSearch = useCallback(
    async (value: string) => {
      setLoading(true);
      setSearchValue(value);
      const inRecents = blockchainData.recentBlocks.filter((block) =>
        block.key.startsWith(value)
      );
      if (inRecents.length > 0) {
        setSearchResult(undefined);
        setLoading(false);
      } else {
        try {
          const block = await getBlock(Number(value));
          if (block) {
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
          } else {
            setSearchResult(undefined);
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
          setSearchResult(undefined);
          setLoading(false);
        }
      }
    },
    [setLoading, setSearchValue, setSearchResult]
  );

  useEffect(() => {
    const intervalTime =
      blockchainData.avgTime > 0 ? blockchainData.avgTime * 1000 : 3000;
    setInterval(() => getBlockchainData(), intervalTime);
  }, [defaultAsset, getBlockchainData, routerQuery]);

  return {
    loading,
    blockchainData,
    searchValue,
    searchResult,
    handleSearch,
  };
}
