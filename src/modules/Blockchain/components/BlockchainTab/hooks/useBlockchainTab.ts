import { ParsedUrlQuery } from "querystring";

import { uniq } from "lodash";
import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useAsset,
  useBlockchain,
  useFormDate,
} from "../../../../../common/hooks";
import { useAssetsContext } from "../../../../../common/providers";
import { BlockColumns } from "../components";

import {
  BlockchainStats,
  BlockchainSupply,
  BlockColumnType,
  DataTableRow,
  UseBlockchainTabResult,
} from "./useBlockchainTab.types";

export function useBlockchainTab(
  routerQuery?: ParsedUrlQuery
): UseBlockchainTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataSource, setSearchDataSource] = useState<DataTableRow[]>([]);
  const [currentBlock, setCurrentBlock] = useState<number>(0);
  const [lastIrreversibleBlock, setLastIrreversibleBlock] =
    useState<string>("");
  const [avgTime, setAvgTime] = useState<number>(0);
  const [supply, setSupply] = useState<BlockchainSupply>({
    amount: 0,
    symbol: "TEST",
  });
  const [blockchainTableRows, setDataTableRows] = useState<DataTableRow[]>([]);
  const [blockchainStats, setBlockchainStats] = useState<BlockchainStats>({
    currentBlock: [],
    lastIrreversible: [],
    avgTime: [],
    supply: [],
  });
  const [blockColumns, setBlockColumns] = useState<BlockColumnType[]>([]);
  const { defaultAsset } = useAssetsContext();
  const { updateArrayWithLimit } = useArrayLimiter();
  const {
    getChain,
    getBlockData,
    getDynamic,
    getRecentBlocks,
    getAvgBlockTime,
  } = useBlockchain();
  const { setPrecision } = useAsset();
  const { formDate } = useFormDate();

  const getBlockchainData = useCallback(async () => {
    try {
      const recentBlocks = getRecentBlocks();

      const chain = await getChain();
      const blockData = await getBlockData();
      const dynamic = await getDynamic();

      const chainAvgTime = getAvgBlockTime();

      const blockRows = recentBlocks.map((block) => {
        return {
          key: block.id as number,
          blockID: block.id as number,
          time: formDate(block.timestamp, ["month", "date", "year", "time"]),
          witness: block.witness_account_name,
          transaction: block.transactions.length,
        };
      });
      const allWitnesses = blockRows.map((block) => block.witness);
      const witnesses = uniq(allWitnesses);
      const updateBlockColumns = BlockColumns.map((column) => {
        if (column.key === "witness") {
          column.filters = witnesses.map((witness) => {
            return { text: witness, value: witness };
          });
        }
        return { ...column };
      });
      setBlockColumns(updateBlockColumns);
      if (defaultAsset && chain && blockData && dynamic) {
        const distance_form_irreversible =
          blockData.head_block_number - blockData.last_irreversible_block_num;
        const supplyAmount = setPrecision(
          false,
          parseInt(dynamic.current_supply),
          defaultAsset.precision
        );
        setCurrentBlock(blockData.head_block_number);
        setLastIrreversibleBlock(
          blockData.last_irreversible_block_num +
            " (-" +
            distance_form_irreversible +
            ")"
        );
        setAvgTime(Number(chainAvgTime.toFixed(0)));
        setSupply({
          amount: supplyAmount,
          symbol: defaultAsset.symbol,
        });
        setDataTableRows(blockRows);
        setSearchDataSource(blockRows);
        setBlockchainStats({
          currentBlock: updateArrayWithLimit(
            blockchainStats.currentBlock,
            blockData.head_block_number,
            99
          ),
          lastIrreversible: updateArrayWithLimit(
            blockchainStats.lastIrreversible,
            distance_form_irreversible,
            99
          ),
          avgTime: updateArrayWithLimit(
            blockchainStats.avgTime,
            Number(chainAvgTime.toFixed(0)),
            99
          ),
          supply: updateArrayWithLimit(
            blockchainStats.supply,
            supplyAmount,
            99
          ),
        });
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [
    defaultAsset,
    getChain,
    getBlockData,
    getDynamic,
    setCurrentBlock,
    setLastIrreversibleBlock,
    setAvgTime,
    setSupply,
    setDataTableRows,
    setBlockchainStats,
    setLoading,
  ]);

  useEffect(() => {
    const intervalTime = avgTime > 0 ? avgTime * 1000 : 3000;
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
    blockColumns,
    blockchainTableRows,
    blockchainStats,
    currentBlock,
    lastIrreversibleBlock,
    avgTime,
    supply,
    searchDataSource,
    setSearchDataSource,
  };
}
