import { useState } from "react";

import { useBlockchain } from "../../../../../common/hooks";

export function useBlockPage(block: string): BlockPage {
  const [blockData, setBlockData] = useState();
  const { getBlock } = useBlockchain();
//   const block = await getBlock(Number(value));
  useEffect(() => {
    getBlockData();
  }, []);

  return {};
}
