import { useCallback } from "react";

import { usePeerplaysApiContext } from "../components/PeerplaysApiProvider";

import { Block, Blockchain } from "./useBlockChain.types";

export function useBlockchain(): Blockchain {
  const { dbApi } = usePeerplaysApiContext();

  const getChainData = useCallback(async () => {
    const chainData = await dbApi("get_objects", [["2.1.0"]]);
    return chainData[0];
  }, []);

  const getBlockData = useCallback(async () => {
    const blockData = await dbApi("get_objects", [["2.0.0"]]);
    return blockData[0];
  }, []);

  const getDynamic = useCallback(async () => {
    const dynamic = await dbApi("get_objects", [["2.3.0"]]);
    return dynamic[0];
  }, []);

  const getBlock = useCallback(async (value: number) => {
    const block = await dbApi("get_block", [value]);
    const witness = await dbApi("get_objects", [[block.witness]]);
    const witnessAccount = await dbApi("get_accounts", [
      [witness[0].witness_account],
    ]);
    block.witness_account_name = witnessAccount[0].name;
    return block;
  }, []);

  const getBlocks = useCallback(
    async (first: number, last: number, limit: number) => {
      const blocks = await dbApi("get_blocks", [first, last, limit]);
      blocks.map(async (block: Block) => {
        const witness = await dbApi("get_objects", [[block.witness]]);
        const witnessAccount = await dbApi("get_accounts", [
          [witness[0].witness_account],
        ]);
        block.witness_account_name = witnessAccount[0].name;
        return block;
      });
      return blocks;
    },
    []
  );

  return { getChainData, getBlockData, getDynamic, getBlock, getBlocks };
}
