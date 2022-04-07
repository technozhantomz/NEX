import { useCallback, useEffect, useState } from "react";

import { useBlockchain } from "../../../../../common/hooks";
import { BlockTableRow } from "../../../types";

import { UseBlockDetailsResult } from "./useBlockDetails.types";

export function useBlockDetails(block: string): UseBlockDetailsResult {
  const [blockDetails, setBlockDetails] = useState<BlockTableRow>({
    key: block,
    blockID: block,
    time: "",
    transaction: 0,
    witness: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { getBlock } = useBlockchain();

  const getBlockDetails = useCallback(async () => {
    try {
      setLoading(true);
      const rawBlock = await getBlock(Number(block));
      if (rawBlock) {
        setBlockDetails({
          key: block,
          blockID: block,
          time: new Date(rawBlock.timestamp).toLocaleString(),
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

  useEffect(() => {
    getBlockDetails();
  }, [block]);

  return { blockDetails, loading };
}
