import { useCallback, useState } from "react";

import { UseGPOSTabResult } from "./useGPOSTab.types";

export function useGPOSTab(): UseGPOSTabResult {
  const [readMore, _setReadMore] = useState<boolean>(false);

  const setReadMore = useCallback(
    (readMore: boolean) => {
      _setReadMore(readMore);
    },
    [_setReadMore]
  );

  return { setReadMore, readMore };
}
