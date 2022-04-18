import { Block, BlockData, Dynamic, GlobalProperties } from "../types";

export type UseBlockchainResult = {
  getChain: () => Promise<GlobalProperties | undefined>;
  getBlockData: () => Promise<BlockData | undefined>;
  getDynamic: () => Promise<Dynamic | undefined>;
  getRecentBlocks: () => Block[];
  getAvgBlockTime: () => number;
  getBlock: (value: number) => Promise<Block | undefined>;
  getBlocks: (
    first: number,
    last: number,
    limit: number
  ) => Promise<Block[] | undefined>;
};
