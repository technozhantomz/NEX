import { Block, BlockData, Chain, Dynamic } from "../types";

export type UseBlockchainResult = {
  getChain: () => Promise<Chain | undefined>;
  getBlockData: () => Promise<BlockData | undefined>;
  getDynamic: () => Promise<Dynamic | undefined>;
  getBlock: (value: number) => Promise<Block | undefined>;
  getBlocks: (
    first: number,
    last: number,
    limit: number
  ) => Promise<Block[] | undefined>;
};
