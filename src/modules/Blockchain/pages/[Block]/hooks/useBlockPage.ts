import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useBlockchain } from "../../../../../common/hooks";

import { BlockPage } from "./useBlockPage.types";

export function useBlockPage(block: string): BlockPage {
  const [blockData, setBlockData] = useState({
    blockID: block,
    time: "",
    transactions: 0,
    witness: "",
  });
  const { getBlock } = useBlockchain();
  const router = useRouter();

  useEffect(() => {
    getBlockData();
  }, [block]);

  const onTabClick = (key: string) => {
    router.push(`/blockchain?tab=${key}`);
  };

  const getBlockData = async () => {
    const rawBlock = await getBlock(Number(block));
    setBlockData({
      blockID: block,
      time: new Date(rawBlock.timestamp).toLocaleString(),
      transactions: rawBlock.transactions.length,
      witness: rawBlock.witness_account_name,
    });
  };

  return { blockData, onTabClick };
}
