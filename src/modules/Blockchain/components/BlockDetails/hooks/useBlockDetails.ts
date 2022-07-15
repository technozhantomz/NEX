import { useCallback, useEffect, useState } from "react";

import { useBlockchain, useFormDate } from "../../../../../common/hooks";
import { BlockTableRow } from "../../../types";

import { UseBlockDetailsResult } from "./useBlockDetails.types";

export function useBlockDetails(block: string): UseBlockDetailsResult {
  const [hasNextBlock, setHasNextBlock] = useState<boolean>(false);
  const [hasPreviousBlock, setHasPreviousBlock] = useState<boolean>(false);
  const [blockDetails, setBlockDetails] = useState<BlockTableRow>({
    key: block,
    blockID: block,
    time: "",
    transaction: 0,
    witness: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSideBlocks, setLoadingSideBlocks] = useState<boolean>(true);
  const { formLocalDate } = useFormDate();
  const { getBlock } = useBlockchain();

  const getBlockDetails = useCallback(async () => {
    try {
      setLoading(true);
      const rawBlock = await getBlock(Number(block));
      if (rawBlock) {
        setBlockDetails({
          key: block,
          blockID: block,
          time: formLocalDate(rawBlock.timestamp, [
            "month",
            "date",
            "year",
            "time",
          ]),
          transaction: rawBlock.transactions.length,
          witness: rawBlock.witness_account_name,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [block, setBlockDetails]);

  const getSideBlocks = useCallback(async () => {
    try {
      setLoadingSideBlocks(true);
      const nextBlock = await getBlock(Number(block) + 1);
      if (nextBlock) {
        setHasNextBlock(true);
      } else {
        setHasNextBlock(false);
      }
      const previousBlock = await getBlock(Number(block) - 1);
      if (previousBlock) {
        setHasPreviousBlock(true);
      } else {
        setHasPreviousBlock(false);
      }
      setLoadingSideBlocks(false);
    } catch (e) {
      console.log(e);
      setHasNextBlock(false);
      setHasPreviousBlock(false);
      setLoadingSideBlocks(false);
    }
  }, [getBlock, block, setHasNextBlock, setHasPreviousBlock]);

  useEffect(() => {
    getBlockDetails();
  }, [block]);

  useEffect(() => {
    getSideBlocks();
  }, [getSideBlocks]);

  return {
    blockDetails,
    loading,
    hasNextBlock,
    hasPreviousBlock,
    loadingSideBlocks,
  };
}
