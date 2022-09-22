import { BlockchainTableRow } from "../../BlockchainTab/hooks/useBlockchainTab.types";

export type UseBlockDetailsResult = {
  blockDetails: BlockchainTableRow;
  loading: boolean;
  hasNextBlock: boolean;
  hasPreviousBlock: boolean;
  loadingSideBlocks: boolean;
};
