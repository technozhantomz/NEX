import { ChainStore } from "peerplaysjs-lib";
import { useCallback } from "react";

import { usePeerplaysApiContext } from "../../providers";
import {
  Account,
  Block,
  BlockData,
  BlockHeader,
  Dynamic,
  GlobalProperties,
  WitnessAccount,
} from "../../types";

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
  }, [ChainStore, dbApi]);

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
        const block: Block | null = await dbApi("get_block", [value]);
        if (block) {
          const witness: WitnessAccount = (
            await dbApi("get_objects", [[block.witness]])
          )[0];
          const witnessAccount: Account = (
            await dbApi("get_accounts", [[witness.witness_account]])
          )[0];
          block.witness_account_name = witnessAccount.name;
          return block;
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const getBlocks = useCallback(
    async (first: number, last: number, limit: number) => {
      try {
        const blocks: Block[] | undefined = await dbApi("get_blocks", [
          first,
          last,
          limit,
        ]);
        if (blocks) {
          let nonNullBlocks = blocks.filter((block) => block);
          if (nonNullBlocks && nonNullBlocks.length > 0) {
            const witnessesAccounts: WitnessAccount[] = await dbApi(
              "get_objects",
              [nonNullBlocks.map((block) => block.witness)]
            );
            const accounts: Account[] = await dbApi("get_accounts", [
              witnessesAccounts.map((witness) => witness.witness_account),
            ]);
            nonNullBlocks = nonNullBlocks.map((block) => {
              const witnessAccount = witnessesAccounts.find(
                (witness) => witness.id === block.witness
              ) as WitnessAccount;
              const account = accounts.find(
                (a) => a.id === witnessAccount.witness_account
              ) as Account;
              block.witness_account_name = account.name;

              return block;
            });
            return nonNullBlocks;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const getBlockHeader = useCallback(
    async (blockNumber: number) => {
      try {
        const blockHeader: BlockHeader = await dbApi("get_block_header", [
          blockNumber,
        ]);
        return blockHeader;
      } catch (e) {
        console.log(e);
      }
    },
    [dbApi]
  );

  const getGlobalProperties = useCallback(async () => {
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      if (gpo) {
        return gpo;
      }
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  return {
    getChain,
    getBlockData,
    getDynamic,
    getRecentBlocks,
    getAvgBlockTime,
    getBlock,
    getBlocks,
    getBlockHeader,
    getGlobalProperties,
  };
}
