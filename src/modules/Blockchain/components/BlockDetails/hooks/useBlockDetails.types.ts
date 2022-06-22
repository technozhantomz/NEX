import { BlockTableRow } from "../../../types";

export type UseBlockDetailsResult = {
  blockDetails: BlockTableRow;
  loading: boolean;
  hasNextBlock: boolean;
  hasPreviousBlock: boolean;
  loadingSideBlocks: boolean;
};
