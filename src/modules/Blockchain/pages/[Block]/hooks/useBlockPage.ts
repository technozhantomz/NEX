import { useCallback, useEffect, useState } from "react";

import { useBlockchain } from "../../../../../common/hooks";
import { BlockTableRow } from "../../../types";

import { BlockPage } from "./useBlockPage.types";

export function useBlockPage(block: string): BlockPage {
  const [blockData, setBlockData] = useState<BlockTableRow>({
    key: block,
    blockID: block,
    time: "",
    transaction: 0,
    witness: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const { getBlock } = useBlockchain();

  const getBlockData = useCallback(async () => {
    try {
      setLoading(true);
      const rawBlock = await getBlock(Number(block));
      if (rawBlock) {
        setBlockData({
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
  }, [block, setBlockData]);

  useEffect(() => {
    getBlockData();
  }, [block]);

  return { blockData, loading };
}
