import { ChainStore } from "peerplaysjs-lib";
import { useCallback } from "react";

import { usePeerplaysApiContext } from "../providers";
import {
  Account,
  Block,
  BlockData,
  Dynamic,
  GlobalProperties,
  WitnessAccount,
} from "../types";

import { UseBlockchainResult } from "./useBlockChain.types";

export function useBlockchain(): UseBlockchainResult {
  const { dbApi } = usePeerplaysApiContext();

  const getChain = useCallback(async () => {
    try {
      const gpo = await dbApi("get_objects", [["2.0.0"]]);
      if (gpo && gpo.length) {
        return gpo[0] as GlobalProperties;
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  const getBlockData = useCallback(async () => {
    try {
      const blockData = await dbApi("get_objects", [["2.1.0"]]);
      if (blockData && blockData.length > 0) {
        return blockData[0] as BlockData;
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  const getDynamic = useCallback(async () => {
    try {
      const dynamic = await dbApi("get_objects", [["2.3.0"]]);
      if (dynamic && dynamic.length > 0) {
        return dynamic[0] as Dynamic;
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  const getRecentBlocks = useCallback(() => {
    let recentBlocks: Block[] = ChainStore.getRecentBlocks().toJS();
    recentBlocks = recentBlocks.sort(
      (a, b) => (b.id as number) - (a.id as number)
    );
    return recentBlocks;
  }, []);

  const getAvgBlockTime = useCallback(() => {
    const recentBlocks = getRecentBlocks();

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

    const chainAvgTime = blockTimes.reduce((previous, current, _idx, array) => {
      return previous + current[1] / array.length;
    }, 0);

    return chainAvgTime;
  }, [getRecentBlocks]);

  const getBlock = useCallback(
    async (value: number) => {
      try {
        const block: Block = await dbApi("get_block", [value]);
        const witness: WitnessAccount = (
          await dbApi("get_objects", [[block.witness]])
        )[0];
        const witnessAccount: Account = (
          await dbApi("get_accounts", [[witness.witness_account]])
        )[0];
        block.witness_account_name = witnessAccount.name;
        return block;
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const getBlocks = useCallback(
    async (first: number, last: number, limit: number) => {
      try {
        const blocks = await dbApi("get_blocks", [first, last, limit]);
        if (blocks) {
          blocks.map(async (block: Block) => {
            const witness: WitnessAccount = (
              await dbApi("get_objects", [[block.witness]])
            )[0];
            const witnessAccount: Account = (
              await dbApi("get_accounts", [[witness.witness_account]])
            )[0];
            block.witness_account_name = witnessAccount.name;
            return block;
          });
          return blocks;
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  return {
    getChain,
    getBlockData,
    getDynamic,
    getRecentBlocks,
    getAvgBlockTime,
    getBlock,
    getBlocks,
  };
}
