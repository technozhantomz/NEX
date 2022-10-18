import { DataTableRow } from "../../BlockchainTab/hooks/useBlockchainTab.types";

export type UseBlockDetailsResult = {
  blockDetails: DataTableRow;
  loading: boolean;
  hasNextBlock: boolean;
  hasPreviousBlock: boolean;
  loadingSideBlocks: boolean;
};
