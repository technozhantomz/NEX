import { ParsedUrlQuery } from "querystring";

import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useBlockchain,
  useFormDate,
} from "../../../../../common/hooks";
import { useAssetsContext } from "../../../../../common/providers";
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
  const [searchResult, setSearchResult] = useState<BlockTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { defaultAsset } = useAssetsContext();
  const { updateArrayWithLimit } = useArrayLimiter();
  const {
    getChain,
    getBlockData,
    getDynamic,
    getRecentBlocks,
    getAvgBlockTime,
    getBlocks,
  } = useBlockchain();
  const { formDate } = useFormDate();
  const MAX_BLOCKS_LIMIT = 100;

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
          time: formDate(block.timestamp, ["month", "date", "year", "time"]),
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
      if (value && value !== "") {
        setLoading(true);
        setSearchValue(value);
        try {
          const blocks = await getBlocks(
            Number(value),
            Number(value) + MAX_BLOCKS_LIMIT,
            MAX_BLOCKS_LIMIT
          );
          if (blocks && blocks.length) {
            console.log(blocks);
            let blockCounter = Number(value) - 1;
            const searchResult = blocks.map((block) => {
              blockCounter = blockCounter + 1;
              return {
                key: String(blockCounter),
                blockID: String(blockCounter),
                time: formDate(block.timestamp, [
                  "month",
                  "date",
                  "year",
                  "time",
                ]),
                witness: block.witness_account_name,
                transaction: block.transactions.length,
              } as BlockTableRow;
            });
            setSearchResult(searchResult);
            setLoading(false);
          } else {
            setSearchResult([]);
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
          setSearchResult([]);
          setLoading(false);
        }
      }
    },
    [setLoading, setSearchValue, setSearchResult]
  );

  useEffect(() => {
    const intervalTime =
      blockchainData.avgTime > 0 ? blockchainData.avgTime * 1000 : 3000;
    const blockchainInterval = setInterval(
      () => getBlockchainData(),
      intervalTime
    );
    return () => {
      clearInterval(blockchainInterval);
    };
  }, [defaultAsset, getBlockchainData, routerQuery]);

  return {
    loading,
    blockchainData,
    searchValue,
    searchResult,
    handleSearch,
  };
}
