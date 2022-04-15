import { ParsedUrlQuery } from "querystring";

import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useAsset,
  useBlockchain,
} from "../../../../../common/hooks";
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
  const [loading, setLoading] = useState<boolean>(true);
  const { defaultAsset } = useAsset();
  const { updateArrayWithLimit } = useArrayLimiter();
  const {
    getChain,
    getBlockData,
    getDynamic,
    getRecentBlocks,
    getAvgBlockTime,
    getBlock,
  } = useBlockchain();

  const getBlockchainData = useCallback(async () => {
    try {
      const recentBlocks = getRecentBlocks();

      const chain = await getChain();
      const blockData = await getBlockData();
      const dynamic = await getDynamic();

      const chainAvgTime = getAvgBlockTime();

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
          currentBlock: blockData.head_block_number,
          supply: {
            amount:
              Number(dynamic.current_supply) / 10 ** defaultAsset.precision,
            symbol: defaultAsset.symbol,
          },
          activeWitnesses: chain.active_witnesses,
          avgTime: Number(chainAvgTime.toFixed(0)),
          recentBlocks: blockRows,
          stats: {
            blocks: updateArrayWithLimit(
              blockchainData.stats.blocks,
              blockData.head_block_number,
              99
            ),
            supply: updateArrayWithLimit(
              blockchainData.stats.supply,
              Number(dynamic.current_supply) / 10 ** defaultAsset.precision,
              99
            ),
            witnesses: updateArrayWithLimit(
              blockchainData.stats.witnesses,
              chain.active_witnesses.length,
              99
            ),
            times: updateArrayWithLimit(
              blockchainData.stats.times,
              Number(chainAvgTime.toFixed(0)),
              99
            ),
          },
        });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [
    getChain,
    getBlockData,
    getDynamic,
    setBlockchainData,
    defaultAsset,
    setLoading,
  ]);

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
